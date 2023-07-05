import { request } from "./api.js";
import DocumentList from "./DocumentList.js";
import { push } from "./router.js";
import { setItem, removeItem } from "./storage.js";
import LinkButton from "./LinkButton.js";

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
    onDeleteDocument: async (id) => {
      const deletedDoc = async (id) => {
        await request(`/documents/${id}`, {
          method: "DELETE",
        });
        removeItem(id);
        removeItem(`temp-document-${id}`);
      };

      await deletedDoc(id);
      push("/");
    },
  });

  new LinkButton({
    $target: $documentPage,
    initialState: {
      text: "+ Add a document",
      link: "/documents/new",
    },
  });

  this.render = () => {
    $target.appendChild($documentPage);
  };

  this.render();
}
