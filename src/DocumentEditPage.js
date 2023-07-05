import Editor from "./Editor.js";
import { request } from "./api.js";
import { push } from "./router.js";
import { getItem, setItem, removeItem } from "./storage.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $documentEditPage = document.createElement("div");

  $documentEditPage.className = "documentEditPage";

  this.state = initialState;

  let docLocalSaveKey = `temp-document-${this.state.docId}`;
  let timer = null;

  const editor = new Editor({
    $target: $documentEditPage,
    initialState: {
      title: "",
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
        const isNewDocument = this.state.docId === "new";
        if (isNewDocument) {
          if (doc.title === "") {
            doc.title = "Untitled";
          }

          const createdDoc = await request("/documents", {
            method: "POST",
            body: JSON.stringify(doc),
          });

          await request(`/documents/${createdDoc.id}`, {
            method: "PUT",
            body: JSON.stringify(doc),
          });

          history.replaceState(null, null, `/documents/${createdDoc.id}`);
          removeItem(docLocalSaveKey);

          this.setState({
            docId: createdDoc.id,
          });

          push(createdDoc.id);
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
    if (this.state.docId === "new" && nextState.docId === "new") {
      const tempDocument = await getItem(docLocalSaveKey, {
        title: "Untitled",
        content: "",
      });

      if (tempDocument.title !== "" || tempDocument.content !== "") {
        this.state = {
          ...this.state,
          doc: tempDocument,
        };
      } else {
        this.state = nextState;
      }

      editor.setState(this.state.doc);

      this.render();
      return;
    }

    if (this.state.docId !== nextState.docId) {
      docLocalSaveKey = `temp-document-${nextState.docId}`;
      this.state = nextState;

      if (this.state.docId === "new") {
        const doc = getItem(docLocalSaveKey, {
          title: "Untitled",
          content: "",
        });

        editor.setState(doc);

        this.render();
      } else {
        await fetchDocument();
      }
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

    if (this.state !== "new") {
      const doc = await request(`/documents/${docId}`, {
        method: "GET",
      });

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
    }
  };

  this.render = () => {
    $target.appendChild($documentEditPage);
  };
}
