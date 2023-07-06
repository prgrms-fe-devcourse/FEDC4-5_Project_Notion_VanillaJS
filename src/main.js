import App from "./App.js";

//const $target = document.querySelector("#app");
const $sidebarTarget = document.querySelector(".notion-sidebar-container");
const $contentTarget = document.querySelector(".notion-content");

new App({ $sidebarTarget, $contentTarget });
