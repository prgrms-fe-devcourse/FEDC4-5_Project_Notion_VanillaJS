import MainPage from "./pages/MainPage.js";
import { initRouter } from "./utils/router.js";

export default function App({$target}){
  const mainPage = new MainPage({
    $target,
    initialState : {
      documents : [],
      id : null,
      documentContent : null,
    }
  });

  this.route = () => {
    $target.innerHTML = "";
    const {pathname} = window.location;

    if(pathname === "/"){
      mainPage.init(null);
    }else if(pathname.indexOf("/documents/") === 0){
      const [, , id] = pathname.split("/");
      mainPage.init(id);
    }else{
      mainPage.init(null);
    }
  }
  this.route();
  initRouter(() => this.route());
  window.addEventListener("popstate", () => {
    this.route();
  })
}