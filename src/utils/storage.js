const storage = (function (storage) {
  const setItem = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key, defaultValue) => {
    try {
      const storedValue = storage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  };

  const removeItem = (key) => {
    storage.removeItem(key);
  };

  return { setItem, getItem, removeItem };
})(window.localStorage);

export default storage;
