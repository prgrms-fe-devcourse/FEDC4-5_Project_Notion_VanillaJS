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
        displayed: "",
      });

      push(`/documents/${createdDoc.id}`);
    },
    onDeleteDocument: async (selectedDocId) => {
      const { pathname } = window.location;
      const selectedChildIds = [];
      const selectedDocument = await request(`/documents/${selectedDocId}`, {
        method: "GET",
      });
      const { documents } = selectedDocument;

      const deletedDoc = async (selectedDocId) => {
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

      for (const childId of selectedChildIds) {
        await deletedDoc(childId);
      }

      console.log("삭제된 아이디: ", selectedChildIds);

      if (pathname.indexOf("/documents/") === 0) {
        const [, , currentPageId] = pathname.split("/");

        if (selectedDocId === currentPageId) {
          await deletedDoc(selectedDocId);

          history.replaceState(null, null, "/");
          push("/");
        } else if (selectedChildIds.includes(Number(currentPageId))) {
          history.replaceState(null, null, "/");
          push("/");
        } else {
          await deletedDoc(selectedDocId);

          push(`/documents/${currentPageId}`);
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
