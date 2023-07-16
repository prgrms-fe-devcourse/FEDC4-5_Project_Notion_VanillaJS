import { Storage } from "../service/index.js";
import { IS_OPEN_STORAGE_KEY } from "../constants/index.js";

export const openStatusStorage = new Storage(IS_OPEN_STORAGE_KEY, {});

export const documentTempStorage = (key) =>
  new Storage(key, { title: "", content: "" });
