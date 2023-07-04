import SideBarFooter from "./SideBarFooter.js";
import SidebarHeader from "./SideBarHeader.js";
import SidebarList from "./SideBarList.js";

import { getRootDocuments } from "../../api/api.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");

  this.setState = async () => {
    const documents = await getRootDocuments();
    console.log(documents);
    sidebarList.setState(documents);
  };

  new SidebarHeader({
    $target: $sidebar,
    initialState: "sukvvon",
  });

  const sidebarList = new SidebarList({
    $target: $sidebar,
    initialState: [],
  });

  new SideBarFooter({
    $target: $sidebar,
  });

  this.render = () => {
    $target.appendChild($sidebar);
  };

  this.render();
}
