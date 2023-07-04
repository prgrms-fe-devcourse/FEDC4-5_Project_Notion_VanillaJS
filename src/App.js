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
    findAllDocument(this.state, (title, id) => trie.insert(title, id));

    documentListComponent.render();
  };

  this.editorSetState = (nextState) => {
    this.state = nextState;
    documentEditorComponent.render();
  };

  const layoutComponent = new Layout({ appElement });

  const documentListComponent = new DocumentList({
    parentElement: leftContainerElement,
    renderItemComponent: (parentElement) => {
      return RecurDocumentList(
        this.state,
        parentElement,
        (parentId, newDocument) => {
          const nextState = addChildDocument(parentId, this.state, newDocument);
          this.setState(nextState);
        },
        (documentId) => {
          const newState = removeDocument(documentId, this.state);
          if (Number(window.location.pathname.split("/")[2]) !== documentId) {
            this.editorSetState(newState);
          }

          push(PATH.HOME);
          this.setState(newState);
        }
      );
    },
    serverRender: (newState) => this.setState(newState),
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
      if (document.isChangeTitle) {
        const newState = editTitleDocument(
          document.documentId,
          this.state,
          document.title
        );
        this.setState(newState);
      }

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await putDocument({
          documentId: document.documentId,
          data: document,
        });
      }, 1000);
    },
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

    if (pathname === PATH.HOME) {
      documentEditorComponent.reset();
      homeComponent.render();
    } else if (pathname.split("/")[1] === "documents") {
      homeComponent.reset();
      documentEditorComponent.render();
    }
  };
}
