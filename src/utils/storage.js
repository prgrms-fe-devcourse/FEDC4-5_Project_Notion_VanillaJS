const storage = window.localStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    console.log("페이지가 어디로 갔나봐요. 새로고침을 눌러주세요!");
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    if (storedValue) return JSON.parse(storedValue);
    return defaultValue;
  } catch {
    console.log("페이지가 어디로 갔나봐요. 새로고침을 눌러주세요!");
    return defaultValue;
  }
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
