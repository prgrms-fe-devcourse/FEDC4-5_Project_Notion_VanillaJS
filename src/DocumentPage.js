import { request } from "./api.js";
import DocumentList from "./DocumentList.js";
import { push } from "./router.js";
import { setItem, removeItem } from "./storage.js";

export default function DocumentPage({ $target, initialState }) {
  const $documentPage = document.createElement("div");

  $documentPage.className = "DocumentPage";

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;

    documentList.setState({
      ...this.state,
      nextState,
    });
  };

  const documentList = new DocumentList({
    $target: $documentPage,
    initialState,
    onCreateDocument: async (id) => {
      const createdDoc = await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: "Untitled",
          parent: id,
        }),
      });

      setItem(id, {
        id: id,
      });

      push(`/documents/${createdDoc.id}`);
    },
    onDeleteDocument: async (selectedDocId) => {
      const { pathname } = window.location;

      const deletedDoc = async (selectedDocId) => {
        await request(`/documents/${selectedDocId}`, {
          method: "DELETE",
        });
        removeItem(selectedDocId);
        removeItem(`temp-document-${selectedDocId}`);
      };

      if (pathname.indexOf("/documents/") === 0) {
        const [, , currentPageId] = pathname.split("/");

        if (selectedDocId === currentPageId) {
          await deletedDoc(selectedDocId);

          history.replaceState(null, null, "/");
          push("/");
        } else {
          await deletedDoc(selectedDocId);

          push(`/document/${currentPageId}`);
        }
        return;
      } else {
        await deletedDoc(selectedDocId);

        push("/");
      }
    },
  });

  this.render = () => {
    $target.appendChild($documentPage);
  };

  this.render();
}
