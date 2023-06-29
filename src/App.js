import MainPage from "./pages/MainPage.js";
import { initRouter } from "./utils/router.js";

export default function App({$target}){
  const mainPage = new MainPage({
    $target,
    initialState : {
      documents : [],
      postId : "new",
      post : {
        title : "",
        content : ""
      }
    }
  });

  this.route = () => {
    $target.innerHTML = "";
    const {pathname} = window.location;

    if(pathname === "/"){
      mainPage.setState({
        ...mainPage.state,
        id : "new",
        post : {
          title : "",
          content : ""
        }        
      });
    }else if(pathname.indexOf("/documents/") === 0){
      const [, , id] = pathname.split("/");
      mainPage.setState({
        ...mainPage.state,
        id,
      });
    }
  }
  this.route();
  initRouter(() => this.route());
}