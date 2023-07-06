import { request } from "../api/api.js";
import DocumentList from "./DocumentList.js";
import { push } from "../routes/router.js";
import { setItem, removeItem } from "../utils/storage.js";

export default function DocumentPage({ $target, initialState }) {
  const $documentPage = document.createElement("div");

  $documentPage.className = "DocumentPage";

  $documentPage.style = `
    width:30%;
    height:100vh;
    background-color:#fffafa	;
  `;

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

      await request(`/documents/${createdDoc.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: "Untitled",
          content: "",
        }),
      });

      if (id === null) {
        const rootDocId = createdDoc.id;

        this.setState({
          ...this.state,
          docId: rootDocId,
        });

        setItem(rootDocId, {
          id: rootDocId,
          displayed: "",
        });
      }

      //this.state: 새로 생긴 문서의 docId가 api의 문서 아이디와 일치하게 설정됨

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
