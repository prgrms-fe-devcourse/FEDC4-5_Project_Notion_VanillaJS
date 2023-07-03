const storage = window.localStorage;
const LOCAL_SAVE_DOCUMENT_KEY = `temp-document-`;

export const setItemToStorage = (key, value) => {
  try {
    storage.setItem(`${LOCAL_SAVE_DOCUMENT_KEY}${key}`, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getItemFromStorage = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(`${LOCAL_SAVE_DOCUMENT_KEY}${key}`);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue; // 불러오는 데 실패한 경우
  }
};

export const removeItemFromStorage = (key) => {
  storage.removeItem(`${LOCAL_SAVE_DOCUMENT_KEY}${key}`);
};
