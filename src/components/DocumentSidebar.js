import {
  createDocument,
  getDocument,
  deleteDocument,
} from "../service/crud.js";
import DocumentHeader from "./DocumentHeader.js";
import DocumentList from "./DocumentList.js";

export default function DocumentSidebar({ $target, initialState }) {
  const $nav = document.createElement("nav");
  $nav.className = "sidebar";
  $target.appendChild($nav);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const documentHeader = new DocumentHeader({
    $target: $nav,
    name: "Jisung",
    onClick: async () => {
      const add = await createDocument({ title: "안녕!", parent: null }); // 추가 하고,
      const nextState = await getDocument("");
      documentList.setState(nextState);
    },
  });

  // list
  const documentList = new DocumentList({
    $target: $nav,
    initialState,
    // +버튼 시 요소 추가
    addList: async (id) => {
      // 추가한 요소!
      const add = await createDocument({ title: "안녕!", parent: id }); // 추가 하고,
      const nextState = await getDocument("");
      documentList.setState(nextState);
    },
    // - 버튼 시 요소 삭제(api문제..)
    deleteList: async (id) => {
      const deleted = await deleteDocument(id);
      const nextState = await getDocument("");
      documentList.setState(nextState);
    },

    pageRender: async (id) => {
      // api요청!
      const nextState = await getDocument(id);
      console.log(nextState);
      // 데이터를 받아온다.!!! => 이 데이터를 이제 documentpage에 꽂아주면 돼!
    },
  });

  this.render = () => {
    documentHeader.render();
    documentList.render();
  };
  this.render();
}
