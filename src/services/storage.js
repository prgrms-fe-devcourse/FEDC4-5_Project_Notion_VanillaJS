const localStorage = window.localStorage;

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};
