import DocumentPage from "../src/components/DocumentPage.js";
import DocumentEditPage from "../src/components/DocumentEditPage.js";
import { editorRoute } from "../src/utils/router.js";
import MainPage from "../src/pages/MainPage.js";
import { removeDiv } from "./utils/removeDocumentList.js";

export default function App({ $target }) {
  const documentPage = new DocumentPage({
    $target,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: null,
      document: {
        title: "",
        content: "",
      },
    },
  });

  const mainPage = new MainPage({
    $target,
    initialState: "주다현",
  });

  this.render = () => {
    documentPage.render();
  };

  this.render();

  this.route = (parent) => {
    const { pathname } = window.location;
    if (pathname === "/") {
      removeDiv(".edit-page");
      mainPage.render();
    } else {
      removeDiv(".main-page");
      const [, id] = pathname.split("/");
      documentEditPage.setState({
        documentId: id,
        parentId: parent,
      });
    }
  };

  this.route();

  editorRoute((parent) => this.route(parent));
}
