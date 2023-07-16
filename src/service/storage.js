import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "../utils/index.js";

export default class Storage {
  #storageKey;
  #defaultValue;

  constructor(storageKey, defaultValue) {
    this.#storageKey = storageKey;
    this.#defaultValue = defaultValue;
  }

  getData() {
    return getStorageItem(this.#storageKey, this.#defaultValue);
  }

  setData(data) {
    setStorageItem(this.#storageKey, data);
  }

  removeData() {
    removeStorageItem(this.#storageKey);
  }
}
