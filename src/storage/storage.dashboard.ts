import { LocalStorage } from '@/storage/storage.local';
import STORAGE_KEY from '@/storage/key';

class StorageDashboard extends LocalStorage {
  getKeyIsShowOnlyMyPC() {
    return STORAGE_KEY.SHOW_ONLY_MY_COMPUTERS;
  }
  getIsShowOnlyMyPC() {
    const key = this.getKeyIsShowOnlyMyPC();
    const isOnly = this.get(key);
    if (isOnly === undefined || isOnly === null) {
      return false;
    }
    return !!isOnly;
  }
  setIsShowOnlyMyPC(isOnly: boolean) {
    const key = this.getKeyIsShowOnlyMyPC();
    this.set(key, isOnly);
  }
}

const storageDashboard = new StorageDashboard();

export default storageDashboard;
