import App from "./components/App.js";

const $app = document.getElementById("app");

$app.style.display = "flex";
$app.style.justifyContent = "center";

new App({ $target: $app });
