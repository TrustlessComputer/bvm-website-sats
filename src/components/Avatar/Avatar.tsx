import * as S from '@/components/AccountStatus/styled';
import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Spinner } from '@/components/Spinner';
import { useAppSelector } from '@/state/hooks';
import { isFetchingUserGamefi, userGamefiByAddressSelector } from '@/state/user/selector';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

interface IProps {
  size?: number;
}

const Avatar = (props: IProps) => {
  const { size = 52 } = props;

  const { account } = useWeb3React();

  const userGamefi = useAppSelector(userGamefiByAddressSelector)(account);
  const isFetching = useAppSelector(isFetchingUserGamefi);

  const renderAvatar = () => {
    if (isFetching) {
      return <Spinner size={24} />;
    }
    if (userGamefi && userGamefi.pfpUrl) {
      return <S.Image size={size} src={userGamefi.pfpUrl} />;
    }
    return <Jazzicon diameter={size} seed={jsNumberForAddress(account || '')} />;
  };

  return <S.Container className="avatar-container">{renderAvatar()}</S.Container>;
};

export default Avatar;
