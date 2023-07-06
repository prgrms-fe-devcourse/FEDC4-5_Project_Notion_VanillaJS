import App from "./src/app"
import storage from "./src/utils/storage"

const initialState = storage.getItem("todos", [])
const $app = document.querySelector("#app")

new App({
  $target: $app,
  initialState,
})
