import Editor from "./Editor.js";
import { request } from "../api/api.js";
import { push } from "../routes/router.js";
import { getItem, setItem, removeItem } from "../utils/storage.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $documentEditPage = document.createElement("div");

  $documentEditPage.className = "documentEditPage";

  $documentEditPage.style.width = "60%";
  $documentEditPage.style.margin = "auto";

  this.state = initialState;

  let docLocalSaveKey = `temp-document-${this.state.docId}`;
  let timer = null;

  const editor = new Editor({
    $target: $documentEditPage,
    initialState: {
      title: "Untitled",
      content: "",
    },
    onEditing: (doc) => {
      setItem(docLocalSaveKey, {
        ...doc,
        tempSaveDate: new Date(),
      });

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const isNew = this.state.docId === null;
        if (isNew) {
          if (doc.title === "") {
            doc.title = "Untitled";
          }

          const createDocument = await request("/documents", {
            method: "POST",
            body: JSON.stringify(doc),
          });

          await request(`/documents/${createDocument.id}`, {
            method: "PUT",
            body: JSON.stringify(doc),
          });

          history.replaceState(null, null, `/documents/${doc.id}`);
          removeItem(docLocalSaveKey);

          this.setState({
            docId: doc.id,
          });

          push(doc.id);
        } else {
          if (doc.title === "") {
            doc.title = "Untitled";
          }
          await request(`/documents/${doc.id}`, {
            method: "PUT",
            body: JSON.stringify(doc),
          });

          removeItem(docLocalSaveKey);
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    //nextState: 리스트에서 선택되는 문서 {docId: '89105'}
    if (this.state.docID === nextState.docId) {
      const tempDocument = await getItem(docLocalSaveKey, {
        title: "Untitled",
        content: "",
      });

      if (tempDocument.title !== "" || tempDocument.content != "") {
        this.state = {
          ...this.state,
          doc: tempDocument,
        };
      } else {
        //새 페이지 생성하고 수정 안 한 담에 새페이지 누르면
        //화면 안 바뀌는 거 아냐??
        this.state = nextState;
      }

      editor.setState(this.state.doc);

      this.render();
      return;
    }

    if (this.state.docId !== nextState.docId) {
      docLocalSaveKey = `temp-document-${nextState.docId}`;
      this.state = nextState;

      await fetchDocument();

      return;
    }

    this.state = nextState;

    this.render();

    if (this.state.doc) {
      editor.setState(this.state.doc || { title: "Untitled", content: "" });
    }
  };

  const fetchDocument = async () => {
    const { docId } = this.state;

    const doc = await request(`/documents/${docId}`, {
      method: "GET",
    });

    if (doc.content === null) doc.content = "";

    const tempDocument = await getItem(docLocalSaveKey, {
      title: "Untitled",
      content: "",
    });

    if (
      tempDocument.tempSaveDate &&
      tempDocument.tempSaveDate > doc.updatedAt
    ) {
      if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
        this.setState({
          ...this.state,
          doc: tempDocument,
        });
        return;
      }
    }

    this.setState({
      ...this.state,
      doc,
    });
  };

  this.render = () => {
    $target.appendChild($documentEditPage);
  };
}
