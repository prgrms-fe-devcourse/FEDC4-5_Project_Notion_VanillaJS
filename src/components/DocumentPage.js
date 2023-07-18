import { request } from "../api/api.js";
import DocumentList from "./DocumentList.js";
import { push } from "../routes/router.js";
import { setItem, removeItem } from "../utils/storage.js";
import LinkButton from "./LinkButton.js";

export default function DocumentPage({ $target, initialState }) {
  const $documentPage = document.createElement("div");

  $documentPage.className = "DocumentPage";

  $documentPage.style = `
    width:30%;
    height:100vh;
    background-color:#fffafa;
  `;

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;

    documentList.setState({
      ...this.state,
      nextState,
    });
  };

  new LinkButton({
    $target: $documentPage,
    initialState: {
      text: "add a document",
      link: "/documents/new",
    },
  });

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
        displayed: "",
      });

      push(`/documents/${createdDoc.id}`);
    },
    onDeleteDocument: async (selectedDocId) => {
      const { pathname } = window.location;

      const selectedChildIds = [selectedDocId];
      const selectedDocument = await request(`/documents/${selectedDocId}`, {
        method: "GET",
      });

      const { documents } = selectedDocument;

      const deleteDoc = async (selectedDocId) => {
        await request(`/documents/${selectedDocId}`, {
          method: "DELETE",
        });
        removeItem(selectedDocId);
        removeItem(`temp-document-${selectedDocId}`);
      };

      const getChildDocIds = (childDocs) => {
        childDocs.forEach(({ id, documents }) => {
          selectedChildIds.push(id);

          if (documents.length) {
            getChildDocIds(documents);
          }
        });
      };

      if (documents.length) {
        getChildDocIds(documents);
      }

      if (pathname.indexOf("/documents/") === 0) {
        const [, , currentPageId] = pathname.split("/");

        if (selectedChildIds.includes(Number(currentPageId))) {
          for (const childId of selectedChildIds) {
            await deleteDoc(childId);
          }
          history.replaceState(null, null, "/");
          push("/");
        } else {
          await deleteDoc(selectedDocId);

          push(`/documents/${currentPageId}`);
        }
        return;
      } else {
        await deleteDoc(selectedDocId);

        push("/");
      }
    },
  });

  this.render = () => {
    $target.appendChild($documentPage);
  };

  this.render();
}
