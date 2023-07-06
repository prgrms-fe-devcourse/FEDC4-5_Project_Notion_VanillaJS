import SideBar from "./components/sideBar/SideBar.js";
import DocumentContent from "./components/content/DocumentContent.js";
import Default from "./components/content/Default.js";
import { initRouter } from "./utils/router.js";
import { request } from "./api.js";

export default function App({ $target }) {
  let timer = null;
  const sideBar = new SideBar({ $target });
  const content = new DocumentContent({
    $target,
    initialState: null,
    onEditing: (document, id) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        if (id) {
          await request(`/documents/${id}`, {
            method: "PUT",
            body: JSON.stringify(document),
          });
        }
      }, 2000);
    },
  });

  this.route = async () => {
    $target.innerHTML = ""; // TODO: 전체를 없애지말고 편집기만 비우기 -> sideBar state 업데이트 언제?
    const { pathname } = window.location;
    const rootDocuments = await request("/documents");
    if (pathname === "/") {
      await sideBar.setState(rootDocuments);
      new Default({ $target });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      // TODO: 우측 편집기 초기화
      await sideBar.setState(rootDocuments);
      content.setId(documentId);
    }
  };

  this.route();

  initRouter(() => this.route());
}
