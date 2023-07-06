import EditPage from "./Components/EditPage.js";
import SideBar from "./Components/SideBar.js";
import {
  getAllDocumentAPI,
  createDocumentAPI,
  deleteDocumentAPI,
} from "./utils/api.js";

export default function App({ target }) {
  this.state = // 컴포넌트 생성 시, initialState를 null로 가지고 있는게 아니라, 처음부터 url에 해당하는 documentId로 설정
    location.pathname === "/"
      ? { selectedDocumentId: null }
      : { selectedDocumentId: location.pathname.split("/")[1] };

  this.setState = (nextState) => {
    this.state = nextState;
    editPage.setState(nextState);
    // => selectedId가 바뀌어도 sidebar가 바뀌는 건 없으므로 editPage의 setState 호출
  };

  const sideBar = new SideBar({
    target,
    initialState: [],
    onAddRootDocument: async () => {
      // 새로운 root document를 추가 후, route()를 통해 selectedId를 새로 생성된 root document의 id로 변경
      const createdRootDocument = await createDocumentAPI();
      history.pushState(null, null, `/${createdRootDocument.id}`);
      this.route();
    },

    onChangeSelectedDocumentId: (newDocumentId) => {
      // 현재 selectedDocumentId를 변경
      history.pushState(null, null, `/${newDocumentId}`);
      this.route();
    },

    onAddChildDocument: async (documentId) => {
      const createdDocument = await createDocumentAPI(documentId); // documentId에 해당하는 docuent를 parent로 하는 새로운 document 생성
      history.pushState(null, null, `/${createdDocument.id}`);
      this.route();
    },

    onDeleteDocument: async (documentId) => {
      if (this.state.selectedDocumentId === documentId) {
        // 만약 현재 selectedDocument가 삭제된다면 main page로 이동해야 하므로
        history.pushState(null, null, `/`);
      }

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
    // 서버로부터 새로 전체 document 받아와서, sidebar setState 다시 하고, 다시 렌더링 => sidebar의 각 document 삭제되거나 그랬을 때, 이거 다시 호출해야되서 이를 콜백함수로 넘기거나 할 듯
    const documentList = await getAllDocumentAPI(); // 전체 document 조회 API
    sideBar.setState(documentList);
  };

  this.route = () => {
    // 현재 url의 pathname으로 selectedId를 변경
    const { pathname } = location;

    if (pathname === "/") {
      this.setState({ selectedDocumentId: null });
      this.render(); // 꼭 해줘야 하나 ?
    } else {
      const [, documentId] = pathname.split("/");
      this.setState({ selectedDocumentId: documentId });
      this.render();
    }
  };

  window.addEventListener("popstate", () => {
    // 뒤로가기, 앞으로가기 버튼 클릭 시에도 history state에 따라 routing
    this.route();
    // this.render(); // 필요한 가 ?
  });

  this.route();
}
