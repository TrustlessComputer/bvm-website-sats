import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

const useCountDown = (
  openMintUnixTimestamp = 0,
  closeMintUnixTimestamp = 0,
): {
  available: boolean;
  countDown: string;
  countDownTimes?: string[];
  countDownTimesSimple?: string[];
} => {
  const refOg = useRef<ReturnType<typeof setInterval> | null>(null);
  const [countDown, setCountDown] = useState<string>('');
  const [available, setAvailable] = useState<boolean>(false);
  const [countDownTimes, setCountDownTimes] = useState<string[]>();
  const [countDownTimesSimple, setCountDownTimesSimple] = useState<string[]>();

  const startCountDown = useCallback(() => {
    const closeMintUTC = new Date(closeMintUnixTimestamp * 1000).getTime();
    refOg.current = setInterval(function () {
      const now = new Date().getTime();

      const distance = closeMintUTC - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const countTime: string[] = [
        String(days < 10 ? '0' + days : days),
        String(hours < 10 ? '0' + hours : hours),
        String(minutes < 10 ? '0' + minutes : minutes),
        String(seconds < 10 ? '0' + seconds : seconds),
      ];
      const countTimeSimple: string[] = [String(days), String(hours), String(minutes), String(seconds)];
      setCountDownTimes(countTime);
      setCountDownTimesSimple(countTimeSimple);
      setCountDown(countTime[0] + 'd : ' + countTime[1] + 'h : ' + countTime[2] + 'm : ' + countTime[3] + 's ');

      if (distance < 0) {
        refOg.current && clearInterval(refOg.current);
        setAvailable(false);
        setCountDown('EXPIRED');
      } else {
        setAvailable(true);
      }
    }, 1000);
  }, [closeMintUnixTimestamp]);

  useEffect(() => {
    if (openMintUnixTimestamp === 0 && closeMintUnixTimestamp === 0) {
      setAvailable(true);
      setCountDown('');
    } else if (openMintUnixTimestamp && closeMintUnixTimestamp === 0) {
      const openMintUTC = new Date(openMintUnixTimestamp * 1000).getTime();
      const currentMintUTC = new Date().getTime();

      if (currentMintUTC < openMintUTC) {
        setAvailable(false);
        setCountDown('COMING SOON');
      } else {
        setAvailable(true);
        setCountDown('');
      }
    } else if (openMintUnixTimestamp === 0 && closeMintUnixTimestamp) {
      startCountDown();
    } else {
      const openMintUTC = new Date(openMintUnixTimestamp * 1000).getTime();
      const currentMintUTC = new Date().getTime();

      if (currentMintUTC < openMintUTC) {
        setAvailable(false);
        setCountDown('COMING SOON');
      } else {
        startCountDown();
      }
    }

    return () => {
      refOg.current && clearInterval(refOg.current);
      setAvailable(false);
      setCountDown('');
    };
  }, [openMintUnixTimestamp, closeMintUnixTimestamp]);

  const availableMemo = useMemo((): boolean => {
    return available;
  }, [available]);
  const countDownMemo = useMemo((): string => {
    return countDown;
  }, [countDown]);

  return {
    available: availableMemo,
    countDown: countDownMemo,
    countDownTimes,
    countDownTimesSimple,
  };
};

export default useCountDown;
