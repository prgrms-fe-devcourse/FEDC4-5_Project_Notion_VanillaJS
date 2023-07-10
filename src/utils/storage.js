import {
  LOCAL_SAVE_DOCUMENT_KEY,
  SPREAD_DOCUMENT_LIST_KEY,
} from "./strings.js";

const storage = window.localStorage;

export const setTempDocumentToStorage = (key, value) => {
  try {
    storage.setItem(`${LOCAL_SAVE_DOCUMENT_KEY}${key}`, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getTempDocumentFromStorage = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(`${LOCAL_SAVE_DOCUMENT_KEY}${key}`);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const removeTempDocumentFromStorage = (key) => {
  storage.removeItem(`${LOCAL_SAVE_DOCUMENT_KEY}${key}`);
};

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
    return defaultValue;
  }
};
