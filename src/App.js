import { EVENT } from "@Utils/constants";
import { patchSidebarState, registerStateSetter } from "@Utils/stateSetters";
import router from "@Utils/router";
import Document from "./components/Document/Document";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

export default function App({ $target }) {
  // 기본 레이아웃 요소 생성
  const $sidebar = new Sidebar({ $target });
  registerStateSetter($sidebar);
  patchSidebarState();

  const $main = document.createElement("div");
  const $header = new Header({ $target: $main });
  registerStateSetter($header);

  const $content = document.createElement("article");

  $main.className = "main-container";
  $content.className = "page-container";

  $main.appendChild($content);
  $target.appendChild($main);

  // route 가능한 요소 등록
  const $home = new Home({ $target: $content });
  registerStateSetter($home);

  const $document = new Document({ $target: $content });
  registerStateSetter($document);

  const route = () => router({ $target: $content });
  window.addEventListener("load", route);
  window.addEventListener("popstate", route);
  window.addEventListener(EVENT.ROUTE, route);
}
