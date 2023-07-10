import DocumentEdit from "../components/DocumentEdit.js";
import DocumentSidebar from "../components/DocumentSidebar.js";

export default function HomePage({ $target, initialState }) {
  const $home = document.createElement("div");
  $home.className = "homepage";

  const sideBar = new DocumentSidebar({
    $target: $home,
    initialState, // initial state를 넘겨준다.
  });
  const edit = new DocumentEdit({
    $target: $home,
  });
  // initialState에 데이터 있음!
  this.render = async () => {
    sideBar.render(); // home안에다가 넣고
    edit.render(); // home안에다가 넣고
    $target.appendChild($home); // home을 #app안에다가 넣는다.
  };
}
