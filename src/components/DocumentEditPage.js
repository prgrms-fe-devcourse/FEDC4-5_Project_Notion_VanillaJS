import Editor from "./Editor.js";
import { setItem, getItem, removeItem } from "../utils/storage.js";
import { request } from "../api/api.js";
import { push } from "../utils/router.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $editPage = document.createElement("div");
  $editPage.className = "edit-page";
  this.state = initialState;

  let documentLocalSaveKey = `temp-document-${this.state.documentId}`;

  const tempDocument = getItem(documentLocalSaveKey, {
    title: "",
    content: "",
  });

  let timer = null;

  const editor = new Editor({
    $target: $editPage,
    initialState: tempDocument || {
      title: "",
      content: "",
    },
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveData: new Date(),
        });

        await request(`/${this.state.documentId}`, {
          method: "PUT",
          body: JSON.stringify(document),
        });

        if (this.state.document.title) {
          if (this.state.document.title !== document.title) {
            push({
              type: null,
              id: null,
            });
          }
        }
        removeItem(documentLocalSaveKey);
      }, 500);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      documentLocalSaveKey = `temp-document-${this.state.documentId}`;
      this.state = nextState;

      if (this.state.documentId === "new") {
        editor.setState(
          this.state.document || {
            title: "",
            content: "",
          }
        );
      } else {
        await fetchDocument();
      }

      return;
    }

    this.state = nextState;
    const document = this.state.document;
    if (document) {
      if (document.title === "제목없음") {
        editor.setState({
          title: "",
          content: this.state.document.content,
        });
      } else {
        editor.setState(
          this.state.document || {
            title: "",
            content: "",
          }
        );
      }
    }

    this.render();
  };

  this.render = () => {
    $target.appendChild($editPage);
  };

  const fetchDocument = async () => {
    const { documentId } = this.state;

    if (this.state.documentId !== null) {
      const document = await request(`/${documentId}`);

      const getTempDocument = getItem(documentLocalSaveKey, {
        title: "",
        content: "",
      });

      this.setState({
        ...this.state,
        document,
      });
    }
  };
}
