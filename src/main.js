import App from "./App.js";
import { initComponent } from "./domain/initData.js";
const $app = document.querySelector("#app");

new App({ ...initComponent, $target: $app });
