import App from "./App.js";

const appEl = document.querySelector("#app");

const app = new App({
  targetEl: appEl,
  initialState: [],
});
