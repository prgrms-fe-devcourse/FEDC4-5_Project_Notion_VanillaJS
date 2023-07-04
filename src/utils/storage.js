const storage = window.localStorage;
const LOCAL_SAVE_DOCUMENT_KEY = `temp-document-`;
const SPREAD_DOCUMENT_LIST_KEY = "spread-document-list";

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

// spread된 document들을 list에 저장
export const setSpreadDocumentToStorage = (value) => {
  try {
    storage.setItem(`${SPREAD_DOCUMENT_LIST_KEY}`, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getSpreadDocumentFromStorage = (defaultValue = null) => {
  try {
    const storedValue = storage.getItem(`${SPREAD_DOCUMENT_LIST_KEY}`);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue; // 불러오는 데 실패한 경우
  }
};
