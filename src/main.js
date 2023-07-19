import { TARGET } from '@consts/target';

import App from './App';
import './reset.css';

const initApp = ($target) => new App($target);

const $app = document.querySelector(`#${TARGET.ENTRY}`);

initApp($app);
