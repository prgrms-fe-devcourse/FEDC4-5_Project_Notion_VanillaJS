import App from "./App.js";
import { route } from "./router/route.js";
const $app = document.querySelector("#app");

// window.onload = () => {
//   if (window.location.pathname !== "/") {
//     route({ url: window.location.pathname });
//   }
// };

new App({
  $target: $app,
  initialState: {},
  events: [
    {
      action: "onload",
      tag: "window",
      target: "window",
      callback: ({ event }) => {
        event.preventDefault();
        console.log("beforeunload");
      },
    },
  ],
  props: {},
});
