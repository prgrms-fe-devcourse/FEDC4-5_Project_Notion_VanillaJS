// 모든 페이지가 여기 들어가.

import DocumentPage from "./pages/DocumentPage.js";
import HomePage from "./pages/HomePage.js";

// 다른 라우팅 별로, 다른 페이지를 랜더링 해주자!

// 그래서 render함수 안에... if문으로 라우팅 해준다.
export default function App({ $target, initialState }) {
  this.route = () => {
    const { pathname } = location;

    // 🟠 라우팅 조건 🟠
    if (pathname === "/") {
      $target.innerHTML = ``;
      const homepage = new HomePage({ $target, initialState });
      homepage.render(); // 홈페이지 띄워준다.
    } else if (pathname.indexOf("documents/") > -1) {
      $target.innerHTML = ``;
      const [, , documentID] = pathname.split("/");
      // documentID
      const documentpage = new DocumentPage({
        $target,
        initialState,
        documentID,
      });
      documentpage.render();
    } else {
      console.log("여기");
      // Error 처리
    }
  };

  // 처음에 실행해야 할 함수.
  this.init = () => {
    this.route();
  };

  // 페이지 이벤트!

  // 모든 2개의 페이지 싹 다 적용!
  // 만약 link를 click하면, pushState적용!
  window.addEventListener("click", (e) => {
    // id를 전달해줘야 돼!
    if (e.target.className === "link") {
      e.preventDefault();
      const { href } = e.target;
      history.pushState(null, null, href.replace(location.origin, ""));
      this.route(); // 재랜더링!
    }
  });

  window.addEventListener("popstate", () => this.route());

  this.init();
}
