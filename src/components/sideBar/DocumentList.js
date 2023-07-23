import DocumentListItem from "./DocumentListItem.js";
import { push } from "../../utils/router.js";
import { createDocument, deleteDocument } from "../../api.js";

export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement("ul");
  $documentList.setAttribute("id", "documentList");
  $target.appendChild($documentList);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // 렌더링할 때마다 documentListItem이 누적되어 쌓이므로 우선 비워줍니다.
    $documentList.innerHTML = "";
    this.state.map((document) => {
      const initialState = {
        title: document.title,
        id: document.id,
        documents: document.documents,
      };
      new DocumentListItem({
        $target: $documentList,
        initialState,
        onAdd: async () => {
          const createdSubDocument = await createDocument(document.id);
          push(`/documents/${createdSubDocument.id}`);
        },
        onDelete: async (id) => {
          const targetIndex = this.state.findIndex(
            (document) => document.id === id
          );
          const nextState = [...this.state];
          nextState.splice(targetIndex, 1);
          this.setState(nextState);
          await deleteDocument(document.id);
          if (window.location.pathname === `/documents/${id}`) {
            alert("이 페이지는 삭제되었습니다.");
            history.replaceState(null, null, `/`);
            location.reload();
          }
        },
      });
    });
  };
  this.render();
}
