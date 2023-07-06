import DocumentList from "./component/DocumentList.js";
import Document from "./component/Document.js";
import { initRouter, push } from "./core/router.js";
import nestedObjectToArray from "./core/nestedObjectToArray.js";
import { getItem, setItem } from "./core/storage.js";
import { request } from "./core/api.js";
import editor from "./component/Editor.js";

export default function App({ $target }) {
  this.state = getItem("tempSaveKey") || alert("새로고침을 해주세요");

  this.setState = async (nextState) => {
    this.state = nextState;
    await documentList.setState(this.state);
    await document.setState(this.state);
  };

  this.fetchDocument = async () => {
    if (getItem("tempSaveKey") == null) {
      const serverDocument = nestedObjectToArray(
        await request("/documents", {
          method: "GET",
        })
      );
      setItem("tempSaveKey", {
        documentList: serverDocument,
        currentDocumentId: serverDocument[0].id,
      });
    }
    await this.setState(getItem("tempSaveKey"));
  };

  this.fetchDocument();

  const documentList = new DocumentList({
    $target,
    initialState: this.state,
    onClick: async (clickedId) => {
      const nextState = {
        documentList: nestedObjectToArray(
          await documentList.fetchDocumentList()
        ),
        currentDocumentId: clickedId,
      };
      setItem("tempSaveKey", nextState);
    },
    onPost: async (clickedId) => {
      await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: "문서 제목",
          parent: clickedId,
        }),
      });
      const nextState = {
        documentList: nestedObjectToArray(
          await documentList.fetchDocumentList()
        ),
        currentDocumentId:
          clickedId == "null"
            ? getItem("tempSaveKey").currentDocumentId
            : clickedId,
      };
      this.setState(nextState);
      setItem("tempSaveKey", nextState);
    },
    onDelete: async (clickedId) => {
      await request(`/documents/${clickedId}`, {
        method: "DELETE",
      });
      const nextState = {
        documentList: nestedObjectToArray(
          await documentList.fetchDocumentList()
        ),
        currentDocumentId:
          getItem("tempSaveKey").documentList[
            getItem("tempSaveKey").documentList.findIndex(
              (document) => document.id == clickedId
            ) - 1
          ].id,
      };
      push(`/documents/${nextState.currentDocumentId}`);
      this.setState(nextState);
      setItem("tempSaveKey", nextState);
    },
  });

  const document = new Document({
    $target,
    initialState: this.state,
  });

  this.route = async () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      await this.setState({ ...this.state, currentDocumentId: null });
    } else if (pathname.indexOf("/documents/") === 0) {
      const splitedPathname = pathname.split("/");
      const documentId = splitedPathname[2];
      const nextState = {
        ...this.state,
        currentDocumentId: Number(documentId),
      };
      await this.setState(nextState);
    }
  };

  this.route();

  initRouter(() => this.route());
}
