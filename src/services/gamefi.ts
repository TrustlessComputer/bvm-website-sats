import createAxiosInstance from '@/services/http';
import { IUserGameInfo } from '@/interface/services/gamefi';
import configs from '@/configs';

const gamefi = createAxiosInstance({
  baseURL: configs.GAMEFI_API_URL,
});

const getUserGameInfo = async (address: string) => {
  return (await gamefi.get(`/v1/user/info/${address}`)) as IUserGameInfo;
};

const gamefiService = {
  getUserGameInfo,
};

export default gamefiService;
