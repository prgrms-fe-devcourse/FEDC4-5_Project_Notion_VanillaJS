import App from "./App.js";

const $app = document.querySelector("#app");

new App({ $target: $app, initalState: { selectedDocument: null, posts: [] } });
