export const getStorageItem = (key, defaultValue) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  } catch (e) {
    console.log(e.message);
    return defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeStorageItem = (key) => {
  localStorage.removeItem(key);
};
