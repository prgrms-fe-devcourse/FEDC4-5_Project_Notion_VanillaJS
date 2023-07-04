import { request } from "./api.js";
import DocumentList from "./DocumentList.js";
import { push } from "./router.js";

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

      push(`/documents/${createdDoc.id}`);
    },
    onDeleteDocument: async (id) => {
      const { pathname } = window.location;

      const deletedDoc = async (id) => {
        await request(`/documents/${id}`, {
          method: "DELETE",
        });
      };

      await deletedDoc(id);
      push("/");
    },
  });

  this.render = () => {
    $target.appendChild($documentPage);
  };

  this.render();
}
