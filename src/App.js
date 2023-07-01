import MainPage from "./pages/MainPage.js";
import { initRouter } from "./utils/router.js";

export default class App{
  constructor($target){
    this.mainPage = new MainPage(
      $target, {
      id : null,
      documents : [],
      documentContent : null
    })
    this.route();
    initRouter(() => this.route());
    window.addEventListener("popstate", () => {
      this.route();
    })
  }

  route(){
    const {pathname} = window.location;
    if(pathname === "/"){
      this.mainPage.setup(null);
    }else if(pathname.indexOf("/documents/") === 0){
      const [, , id] = pathname.split("/");
      this.mainPage.setup(id);
    }
  }
}