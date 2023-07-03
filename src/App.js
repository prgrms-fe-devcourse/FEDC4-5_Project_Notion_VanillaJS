import SideBar from "./components/SideBar.js";
import { request } from "./api.js";

export default function App({ $target }) {
  this.render = () => {
    const rootDocuments = request("/documents", {
      method: "GET",
    });
    new SideBar({ $target });
  };
  this.render();
}
