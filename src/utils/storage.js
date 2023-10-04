export const getItem = (key, defaultValue) => {
  const storedItem = localStorage.getItem(key);
  if (storedItem) {
    return JSON.parse(storedItem);
  }
  return defaultValue;
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
