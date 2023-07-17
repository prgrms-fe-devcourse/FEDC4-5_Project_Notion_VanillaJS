import App from "./App.js";
import { fetchDoc } from "./api.js";

const $app = document.querySelector('.app')
const USERNAME = 'nsr'
const initState = await fetchDoc(USERNAME)

new App({
  $target : $app,
  initState,
  USERNAME
})

