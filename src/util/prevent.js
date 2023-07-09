import { NEW_POST_KEY } from "../constant.js";

export const isTitle = (title) => {
  if (!title || !title.length) return false;
  return true;
};

export const isArray = (arr) => {
  if (!Array.isArray(arr)) return false;
  return true;
};

export const isSuitableId = (id) => {
  if (id === null || id === NEW_POST_KEY) return true;
  return false;
};

export const isUndefined = (target) => {
  if (target === undefined) return true;
  return false;
};

export const isLength = (target) => {
  if (target.length) return true;
  return false;
};
