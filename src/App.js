import EditPage from "./Components/EditPage.js";
import SideBar from "./Components/SideBar.js";
import {
  getAllDocumentAPI,
  createDocumentAPI,
  deleteDocumentAPI,
} from "./utils/api.js";
import {
  AddToSpreadDoucmentList,
  removeFromSpreadDoucmentList,
} from "./utils/dom.js";

export default function App({ target }) {
  this.state =
    location.pathname === "/"
      ? { selectedDocumentId: null }
      : { selectedDocumentId: location.pathname.split("/")[1] };

  this.setState = (nextState) => {
    this.state = nextState;
    editPage.setState(nextState);
  };

  const sideBar = new SideBar({
    target,
    initialState: [],
    onAddRootDocument: async () => {
      const createdRootDocument = await createDocumentAPI();
      history.pushState(null, null, `/${createdRootDocument.id}`);
      this.route();
    },

    onChangeSelectedDocumentId: (newDocumentId = null) => {
      if (newDocumentId) {
        history.pushState(null, null, `/${newDocumentId}`);
      } else {
        history.pushState(null, null, `/`);
      }
      this.route();
    },

    onAddChildDocument: async (documentId) => {
      const createdDocument = await createDocumentAPI(documentId);
      AddToSpreadDoucmentList(documentId);
      history.pushState(null, null, `/${createdDocument.id}`);
      this.route();
    },

    onDeleteDocument: async (documentId) => {
      if (this.state.selectedDocumentId === documentId) {
        history.pushState(null, null, `/`);
      }

      removeFromSpreadDoucmentList(documentId);

      await deleteDocumentAPI(documentId);
      this.route();
    },
  });

  const editPage = new EditPage({
    target,
    initialState: this.state,
    updateSideBar: () => {
      this.render();
    },
  });

  this.render = async () => {
    const documentList = await getAllDocumentAPI();
    sideBar.setState(documentList);
  };

  this.route = () => {
    const { pathname } = location;

    if (pathname === "/") {
      this.setState({ selectedDocumentId: null });
      this.render();
    } else {
      const [, documentId] = pathname.split("/");
      this.setState({ selectedDocumentId: documentId });
      this.render();
    }
  };

  window.addEventListener("popstate", () => {
    this.route();
  });

  this.route();
}
