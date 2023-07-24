import App from "./components/App.js";

const $target = document.querySelector("#app");
$target.className = "contentWrap";

new App({ $target });
