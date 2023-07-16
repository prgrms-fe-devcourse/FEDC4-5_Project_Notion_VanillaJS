/* eslint-disable valid-typeof */
import ValidationError from "./Errors/ValidationError";
import { ERROR } from "./constants";

function checkError(condition, errorObj) {
  try {
    if (condition) {
      throw errorObj;
    }
  } catch (err) {
    console.error(`${err.name}: ${err.message}`);
    return false;
  }

  return true;
}

export function isConstructor(newTarget) {
  return checkError(!newTarget, new ValidationError(ERROR.NEW_MISSED));
}

export function isObjectState(state) {
  return checkError(
    state === null || !(typeof state === "object"),
    new TypeError(ERROR.NONE_OBJECT_STATE)
  );
}

const documentType = {
  id: "number",
  title: "string",
  content: "string",
  documents: "object",
  createdAt: "string",
  updatedAt: "string",
};

export function isDocumentState(state) {
  return (
    isObjectState(state) &&
    checkError(
      Object.entries(state).some(([key, val]) => {
        if (!Object.prototype.hasOwnProperty.call(documentType, key))
          return true;
        if (key !== "content" && typeof val !== documentType[key]) return true;
        if (
          key === "content" &&
          val !== null &&
          typeof val !== documentType[key]
        )
          return true;
        if (key === "documents" && !Array.isArray(val)) return true;

        return false;
      }),
      new ValidationError(ERROR.INVALID_DOCUMENT_STATE)
    )
  );
}

export function isArrayState(state) {
  return checkError(
    !Array.isArray(state),
    new TypeError(ERROR.NONE_ARRAY_STATE)
  );
}

const drawerItemType = {
  id: "number",
  title: "string",
  documents: "object",
};

export function isDrawerItemState(state) {
  return checkError(
    Object.entries(drawerItemType).some(([key, type]) => {
      if (!Object.prototype.hasOwnProperty.call(state, key)) return true;
      if (typeof state[key] !== type) return true;
      if (key === "documents" && !Array.isArray(state[key])) return true;

      return false;
    }),
    new ValidationError(ERROR.INVALID_DRAWERITEM_STATE)
  );
}

export function isDrawerState(state) {
  return (
    isArrayState(state) &&
    checkError(
      !state.reduce((acc, cur) => acc && isDrawerItemState(cur), true),
      new ValidationError(ERROR.INVALID_DRAWER_STATE)
    )
  );
}

export function isHeaderState(state) {
  return (
    isArrayState(state) &&
    checkError(
      state.some((item) => {
        if (!isObjectState(item)) return true;
        if (
          !Object.prototype.hasOwnProperty.call(item, "id") ||
          typeof item.id !== "number"
        )
          return true;
        if (
          !Object.prototype.hasOwnProperty.call(item, "title") ||
          typeof item.title !== "string"
        )
          return true;

        return false;
      }),
      new ValidationError(ERROR.INVALID_HEADER_STATE)
    )
  );
}

export function isHomeState(state) {
  return (
    isObjectState(state) &&
    checkError(
      Object.entries(state).some((key, val) => {
        const numKey = parseInt(key, 10);
        if (Number.isNaN(numKey) || key.length !== numKey.toString().length)
          return true;
        if (!isHomeItemState(val)) return true;

        return false;
      }),
      new ValidationError(ERROR.INVALID_HOME_STATE)
    )
  );
}

const homeItemType = {
  title: "string",
  numUsed: "number",
  lastUsedTime: "number",
};

export function isHomeItemState(state) {
  return (
    isObjectState(state) &&
    checkError(
      Object.entries(homeItemType).some(
        (name, type) =>
          !Object.prototype.hasOwnProperty.call(state, name) ||
          typeof state[name] !== type
      ),

      new ValidationError(ERROR.INVALID_HOME_STATE)
    )
  );
}
