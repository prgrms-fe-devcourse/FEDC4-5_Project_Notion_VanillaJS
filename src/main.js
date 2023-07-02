import App from "./App.js";
import { getApi } from "./api.js";

const $app = document.querySelector('.app')
const userName = 'nsr'
const initState = await getApi(userName)

new App({
  $target : $app,
  initState,
  userName
})

