const storage = window.localStorage;

export const getItem = (key, defaultValue) => {
  const storedValue = storage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
