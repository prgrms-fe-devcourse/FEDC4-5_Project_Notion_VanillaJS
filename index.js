import App from './src/App.js';
import { getRootAPI } from './src/utils/API.js';

const $app = document.querySelector('.App');
const rootDocument = await getRootAPI();
new App($app, rootDocument);