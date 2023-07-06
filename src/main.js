import { default as App } from './App.js';
const $app = document.querySelector('#app');

//main.js가 시작점으로 잡고 App을 만든다.
new App({
  $target: $app,
  initalState: [],
});
