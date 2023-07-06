import App from "./component/App.js";
import { getDocument } from "./api/api.js";

const app = document.querySelector('#app');
const initialState = await getDocument('/documents');

new App({ 
  parent: app,
  initialState
})
