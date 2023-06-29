import App from "./App.js";
import { request } from "./api.js";

const appEl = document.querySelector("#app");
let data;

const app = new App({
  targetEl: appEl,
  initialState: [],
});

(async () => {
  data = await request.getDocumentList();
  app.setState(data);
})();
