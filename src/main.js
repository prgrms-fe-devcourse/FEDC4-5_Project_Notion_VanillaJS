import App from "./components/App.js";

const $notionApp = document.querySelector("#notion-app");
$notionApp.style.display = "flex";

new App({
  $target: $notionApp,
});
