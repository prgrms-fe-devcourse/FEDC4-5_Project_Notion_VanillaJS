const storage = window.localStorage;
export const storageKey = "isClicked";

export const setItem = (key, value) => {
  try {
    storage.setItem(key, value);
  } catch (error) {
    alert(error.message);
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    alert(error.message);
    return defaultValue;
  }
};

export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch (error) {
    alert(error.message);
  }
};
