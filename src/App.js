import SideBar from "./components/sideBar/SideBar.js";
import { request } from "./api.js";

export default function App({ $target }) {
  this.render = async () => {
    const rootDocuments = await request("/documents", {
      method: "GET",
    });
    new SideBar({ $target, initialState: rootDocuments });
  };
  this.render();
}
