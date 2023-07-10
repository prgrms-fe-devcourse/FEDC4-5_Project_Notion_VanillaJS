import App from "./App.js";
import { request } from "./api.js";

const appEl = document.querySelector("#app");

const app = new App({
  targetEl: appEl,
  initialState: [],
});
