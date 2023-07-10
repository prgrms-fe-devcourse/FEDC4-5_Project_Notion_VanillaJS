// sidebar는 무조건 들어감.!

import DocumentEdit from "../components/DocumentEdit.js";
import DocumentSidebar from "../components/DocumentSidebar.js";

// 이게 계속 랜더링 돼!!!
export default function DocumentPage({ $target, initialState, documentID }) {
  // 계속 호출이 되니까 여기서 데이터를 받아온다..!
  const $document = document.createElement("div");
  $document.className = "document-page";

  const sideBar = new DocumentSidebar({
    $target: $document,
    initialState, // initial state를 넘겨준다.
  });
  const edit = new DocumentEdit({
    $target: $document,
    documentID,
  });
  // initialState에 데이터 있음!
  this.render = async () => {
    sideBar.render(); // home안에다가 넣고
    edit.render(); // home안에다가 넣고
    $target.appendChild($document); // home을 #app안에다가 넣는다.
  };
}
