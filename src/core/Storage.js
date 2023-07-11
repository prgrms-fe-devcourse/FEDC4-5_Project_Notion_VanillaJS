const storage = window.localStorage;

export const getItem = (key, defaultValue) => {
  try {
    return JSON.parse(storage.getItem(key));
  } catch (e) {
    return defaultValue;
  }
};

export const setItem = (key, value = '') => {
  storage.setItem(key, JSON.stringify(value));
};
