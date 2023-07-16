import { ROOT_PATH, DOCUMENTS_PATH, INIT_ID } from "../constants/index.js";

export const getEditPageByPath = (pathname, id) => {
  if (pathname === ROOT_PATH) {
    return INIT_ID;
  } else if (pathname.indexOf(DOCUMENTS_PATH) === 0) {
    return id;
  }
};
