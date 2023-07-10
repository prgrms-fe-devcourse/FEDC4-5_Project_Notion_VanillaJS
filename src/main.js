"use strict";

import App from "./App.js";
import { getDocument } from "./service/crud.js";
const $app = document.querySelector("#app");
const initialState = await getDocument(""); // 모든 값 불러오기!

new App({
  $target: $app,
  initialState,
});
