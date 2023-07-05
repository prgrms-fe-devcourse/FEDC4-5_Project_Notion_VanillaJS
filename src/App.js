import { putDocument } from "./api/document.js";
import Layout from "./components/common/Layout.js";
import DocumentList from "./components/domain/DocumentList.js";
import DocumentEditor from "./components/domain/DocumentEditor.js";
import Home from "./components/domain/Home.js";
import { PATH } from "./constants/path.js";
import { initRouter, push } from "./utils/route.js";
import RecurDocumentList from "./components/template/RecurDocumentList.js";
import {
  TrieDocument,
  addChildDocument,
  editTitleDocument,
  findAllDocument,
  findChildDocuments,
  removeDocument,
} from "./utils/document.js";

/**
 * @param {{appElement: Element | null}}
 */

export default function App({ appElement }) {
  if (!new.target) return new App(...arguments);

  const wrapperContainer = document.createElement("div");
  const leftContainerElement = document.createElement("div");
  const rightContainerEleement = document.createElement("div");

  wrapperContainer.className = "wrapper-container";
  leftContainerElement.className = "left-container";
  rightContainerEleement.className = "right-container";

  const trie = new TrieDocument();

  let timer = null;

  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;

    documentListComponent.render();
  };

  this.editorSetState = (nextState) => {
    this.state = nextState;

    documentEditorComponent.render();
  };

  const layoutComponent = new Layout({ parentElement: leftContainerElement });

  const documentListComponent = new DocumentList({
    parentElement: leftContainerElement,
    renderItemComponent: (parentElement) => {
      return RecurDocumentList({
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
      });
    },
    serverRender: (newState) => {
      this.setState(newState);
      findAllDocument(newState, (title, id) => trie.insert(title, id));
    },
    onAddButtonClick: (newDocument) => {
      const nextState = [...this.state, newDocument];

      this.setState(nextState);
    },
  });

  const homeComponent = new Home({
    parentElement: rightContainerEleement,
    search: (text) => trie.search(text),
  });

  const documentEditorComponent = new DocumentEditor({
    parentElement: rightContainerEleement,
    onEditing: (document) => {
      const { documentId, title } = document;

      if (document.isChangeTitle) {
        const newState = editTitleDocument(documentId, this.state, title);

        this.setState(newState);
      }

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await putDocument({ documentId, data: document });
      }, 1000);
    },
    getChildDocuments: (documentId) =>
      findChildDocuments(this.state, documentId),
  });

  window.addEventListener("popstate", () => {
    this.route();
  });

  initRouter(() => this.route());

  this.init = () => {
    documentListComponent.getServer();

    layoutComponent.render();
    documentListComponent.render();

    this.route();

    appElement.append(wrapperContainer);
    wrapperContainer.append(leftContainerElement, rightContainerEleement);
  };

  this.route = () => {
    const { pathname } = window.location;
    rightContainerEleement.innerHTML = ``;

    if (pathname === PATH.HOME) {
      findAllDocument(this.state, (title, id) => trie.insert(title, id));

      homeComponent.render();
    } else if (pathname.split("/")[1] === "documents") {
      documentEditorComponent.render();
    }
  };
}
