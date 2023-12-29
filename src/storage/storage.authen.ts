import { LocalStorage } from '@/storage/storage.local';
import STORAGE_KEY from '@/storage/key';

interface AccessToken {
  accessToken: string;
  refreshToken: string;
  tcAddress: string;
}

class StorageAuthen extends LocalStorage {
  getTokenKey(tcAddress: string) {
    return `${STORAGE_KEY.TOKEN}-${tcAddress.toLowerCase()}`;
  }
  getToken(tcAddress: string): AccessToken | undefined {
    const key = this.getTokenKey(tcAddress);
    return this.get(key) as AccessToken | undefined;
  }
  setToken(token: AccessToken) {
    const key = this.getTokenKey(token.tcAddress);
    this.set(key, token);
  }
  removeToken(tcAddress: string) {
    const key = this.getTokenKey(tcAddress);
    this.remove(key);
  }
}

const storageAuthen = new StorageAuthen();

export default storageAuthen;
