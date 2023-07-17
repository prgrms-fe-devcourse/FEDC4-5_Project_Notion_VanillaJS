import App from "./App.js";

const $sidebarTarget = document.getElementsByClassName(
  "notion-sidebar-container"
)[0];
const $contentTarget = document.getElementsByClassName("notion-content")[0];

new App({ $sidebarTarget, $contentTarget });
