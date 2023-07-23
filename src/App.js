import SideBar from "./components/sideBar/SideBar.js";
import DocumentContent from "./components/content/DocumentContent.js";
import Default from "./components/content/Default.js";
import { initRouter } from "./utils/router.js";
import { debounce } from "./utils/debounce.js";
import { readRootDocuments, updateDocument } from "./api.js";
import PageNotFound from "./utils/PageNotFound.js";

export default function App({ $target }) {
  const sideBar = new SideBar({ $target, initialState: [] });
  const content = new DocumentContent({
    $target,
    initialState: null,
    onEditing: debounce(async (document, id) => {
      if (id) {
        updateDocument(id, document);
      }
    }, 500),
    onChangeTitle: (title, id) => {
      const newRootDocuments = JSON.parse(JSON.stringify(sideBar.state));
      const targetIndex = newRootDocuments.findIndex((elem) => elem.id === id);
      if (targetIndex !== -1) {
        newRootDocuments[targetIndex] = {
          ...newRootDocuments[targetIndex],
          title,
        };
      }
      sideBar.setState(newRootDocuments);
    },
  });

  this.route = async () => {
    $target.innerHTML = ""; // TODO: 전체를 없애지말고 편집기만 비우기 -> sideBar state 업데이트 언제?
    const { pathname } = window.location;
    const rootDocuments = await readRootDocuments();
    if (pathname === "/") {
      sideBar.setState(rootDocuments);
      new Default({ $target });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      // TODO: 우측 편집기 초기화
      sideBar.setState(rootDocuments);
      content.setId(documentId);
    } else {
      new PageNotFound($target);
    }
  };

  this.route();

  initRouter(() => this.route());
}
