export default function createStorage(storage) {
  const setItemToStorage = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
  };

  const getItemToStorage = (key, defaultValue) => {
    try {
      const storedValue = storage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (e) {
      console.log(e);
      return defaultValue;
    }
  };

  const removeItemToStorage = (key) => {
    storage.removeItem(key);
  };

  return { setItemToStorage, getItemToStorage, removeItemToStorage };
}
