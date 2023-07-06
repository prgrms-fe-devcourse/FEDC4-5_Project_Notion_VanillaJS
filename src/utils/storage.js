const storage = window.localStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getItem = (key, defaultValue) => {
  const storedValue = JSON.parse(storage.getItem(key)) || defaultValue;
  return storedValue;
};

export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch (e) {
    console.log(e.message);
  }
};
