import { useEffect, useState } from 'react';
import { BREAKPOINTS, convertBreakpointsToNumber } from '@/theme';

interface Size {
  screenWidth: number;
  heightWidth: number;
}

interface CheckMobile {
  xSMobileScreen: boolean;
  mobileScreen: boolean;
  tabletScreen: boolean;
  desktopScreen: boolean;
  QHDScreen: boolean;
}

function useWindowSize(): Size & CheckMobile {
  const [windowSize, setWindowSize] = useState<Size>({
    screenWidth: 0,
    heightWidth: 0,
  });
  const [xSMobileScreen, setXSMobileScreen] = useState(true);
  const [mobileScreen, setMobileScreen] = useState(true);
  const [tabletScreen, setTabletScreen] = useState(true);
  const [desktopScreen, setDesktopScreen] = useState(true);
  const [QHDScreen, setQHDScreen] = useState(true);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        screenWidth: window.innerWidth,
        heightWidth: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowSize?.screenWidth && windowSize.screenWidth <= convertBreakpointsToNumber(BREAKPOINTS.xs)) {
      setXSMobileScreen(true);
    } else {
      setXSMobileScreen(false);
    }

    if (windowSize?.screenWidth && windowSize.screenWidth <= convertBreakpointsToNumber(BREAKPOINTS.md)) {
      setMobileScreen(true);
    } else {
      setMobileScreen(false);
    }

    if (windowSize?.screenWidth && windowSize.screenWidth <= convertBreakpointsToNumber(BREAKPOINTS.xl)) {
      setTabletScreen(true);
    } else {
      setTabletScreen(false);
    }

    if (windowSize?.screenWidth && windowSize.screenWidth >= convertBreakpointsToNumber(BREAKPOINTS.xxxl)) {
      setQHDScreen(true);
    } else {
      setQHDScreen(false);
    }
  }, [windowSize.screenWidth]);

  useEffect(() => {
    setDesktopScreen(!mobileScreen && !tabletScreen && !xSMobileScreen && !QHDScreen);
  }, [tabletScreen, mobileScreen, xSMobileScreen, QHDScreen]);

  return {
    screenWidth: windowSize.screenWidth,
    heightWidth: windowSize.heightWidth,
    mobileScreen,
    tabletScreen,
    desktopScreen,
    QHDScreen,
    xSMobileScreen,
  };
}

export default useWindowSize;
