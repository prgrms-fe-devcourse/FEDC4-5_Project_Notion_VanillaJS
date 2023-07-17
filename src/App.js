import { getDocuments, putDocument } from "./api/document.js";
import Layout from "./components/common/Layout.js";
import { PATH } from "./constants/path.js";
import { initRouter, push } from "./utils/route.js";
import {
  TrieDocument,
  addChildDocument,
  editTitleDocument,
  insertAllDocument,
  findChildDocuments,
  removeDocument,
} from "./utils/document.js";
import NotFound from "./components/common/NotFound.js";
import { debounce } from "./utils/debounce.js";
import DocumentList from "./components/domain/document/DocumentList.js";
import DocumentEditor from "./components/domain/document/DocumentEditor.js";
import Home from "./components/domain/home/Home.js";
import RecurDocumentList from "./components/domain/document/template/RecurDocumentList.js";

/**
 * @param {{appElement: Element | null}}
 */

export default function App({ appElement }) {
  if (!new.target) return new App(...arguments);

  const wrapperContainer = document.createElement("div");
  const sidebarContainer = document.createElement("div");
  const contentsContainer = document.createElement("div");
  const sidebarListContainer = document.createElement("div");

  wrapperContainer.className = "wrapper-container";
  sidebarContainer.className = "sidebar-container";
  contentsContainer.className = "contents-container";
  sidebarListContainer.className = "sidebar-list-container";

  const trie = new TrieDocument();

  const processEdit = debounce(async (documentId, docunemt) => {
    await putDocument({ documentId, data: docunemt });
  }, 1000);

  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;
    documentListComponent.render();
  };

  this.editorSetState = (nextState) => {
    this.state = nextState;
    documentEditorComponent.render();
  };

  const layoutComponent = new Layout({ parentElement: sidebarContainer });

  const documentListComponent = new DocumentList({
    parentElement: sidebarListContainer,
    renderItemComponent: (parentElement) => {
      RecurDocumentList({
        rootDocuments: this.state,
        parentElement,
        childRender: (parentId, newDocument) => {
          const nextState = addChildDocument(parentId, this.state, newDocument);
          this.setState(nextState);
        },
        removeRender: (documentId) => {
          const newState = removeDocument(documentId, this.state);
          const stringDocumentId = window.location.pathname.split("/")[2];

          Number(stringDocumentId) !== documentId
            ? this.editorSetState(newState)
            : push(PATH.HOME);

          this.setState(newState);
        },
        depthCount: 1,
      });
    },
    onAddButtonClick: (newDocument) => {
      const nextState = [...this.state, newDocument];
      this.setState(nextState);
    },
  });

  const homeComponent = new Home({
    parentElement: contentsContainer,
    search: (text) => trie.search(text),
  });

  const documentEditorComponent = new DocumentEditor({
    parentElement: contentsContainer,
    onEditing: (document) => {
      const { documentId, title, isChangeTitle } = document;

      if (isChangeTitle) {
        const newState = editTitleDocument(documentId, this.state, title);
        this.setState(newState);
      }

      processEdit(documentId, document);
    },
    getChildDocuments: (documentId) =>
      findChildDocuments(this.state, documentId),
  });

  const notFoundComponent = new NotFound({
    parentCompoent: contentsContainer,
  });

  window.addEventListener("popstate", () => {
    this.route();
  });

  initRouter(() => this.route());

  this.init = async () => {
    appElement.append(wrapperContainer);
    wrapperContainer.append(sidebarContainer, contentsContainer);

    layoutComponent.render();
    sidebarContainer.append(sidebarListContainer);

    const newState = await getDocuments();
    this.setState(newState);

    insertAllDocument(newState, (title, id) => trie.insert(title, id));

    this.route();
  };

  this.route = () => {
    const { pathname } = window.location;
    contentsContainer.innerHTML = ``;

    if (pathname === PATH.HOME) {
      trie.reset();
      insertAllDocument(this.state, (title, id) => trie.insert(title, id));

      homeComponent.render();
    } else if (pathname.split("/")[1] === "documents") {
      documentEditorComponent.render();
    } else {
      notFoundComponent.render();
    }
  };
}
