import App from "./App.js";
import { getAllPosts } from "./src/api/posts.js";

const $app = document.querySelector("#app");
const initialState = await getAllPosts();

new App({ $target: $app, initialState });
