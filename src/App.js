import { request } from "./api.js";

export default function App({ $target }) {
  this.render = () => {
    const rootDocuments = request("/documents", {
      method: "GET",
    });
  };
  this.render();
}
