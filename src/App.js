import EditPage from "./Components/EditPage.js";
import SideBar from "./Components/SideBar.js";
import { request } from "./utils/api.js";

export default function App({
  target,
  initialState = {
    selectedDocumentId: null,
  },
}) {
  this.state = initialState;
  /*
  {
    selectedDocumentId: null
  }
*/

  this.setState = (nextState) => {
    // selectedDocumentId를 바꿔줌 => editPage에서 이에 따라
    this.state = nextState;
    editPage.setState(nextState);
    // this.render(); 해줘야 하나 ? 모르겟음
    // => selectedId가 바뀌어도 sidebar가 바뀌는 건 없으므로 editPage의 setState만 나중에 호출해주면 될 듯
  };

  const sideBar = new SideBar({
    target,
    initialState: [],
    onAddRootDocument: async () => {
      // 새로운 root document를 추가 후
      const createdRootDocument = await request("", {
        method: "POST", 
        body: JSON.stringify({
          title: "new Root",
          parent: null,
        }),
      });

      // 그 document의 Id를 현재 selectedDocumentId로 변경
      this.setState({
        selectedDocumentId: createdRootDocument.id,
      });

      // documentList도 다시 불러와서 sideBar 다시 렌더링
      this.render();
    },

    onChangeSelectedDocumentId: (newDocumentId) => {
      // 현재 selectedDocumentId를 변경
      this.setState({
        selectedDocumentId: newDocumentId,
      });
      console.log(`selectedDocumentId: ${this.state.selectedDocumentId}}`);
    },

    onAddChildDocument: async (documentId) => {
      const createdDocument = await request("", {
        // 새로운 하위 document 생성
        method: "POST",
        body: JSON.stringify({
          title: "new Child",
          parent: documentId,
        }),
      });

      this.render(); // documentList 다시 불러오고, 렌더링
      this.setState({
        // 새로 생성한 document의 Id로 selectedId를 변경
        selectedDocumentId: createdDocument.id,
      });
    },

    onDeleteDocument: async (documentId) => {
      if (this.state.selectedDocumentId === documentId) {
        // 만약 현재 selectedDocument가 삭제된다면 main page로 이동해야 하므로
        this.setState({
          selectedDocumentId: null,
        });
      }

      await request(`/${documentId}`, {
        method: "DELETE",
      });

      this.render(); // 삭제 후 다시 render
      console.log(documentId);
      console.log(this.state.selectedDocumentId);
    },
  });

  const editPage = new EditPage({
    target,
    initialState: {
      selectedDocumentId: null, // title과 content도 상태로 넘겨줘야 하나 ?
    },
  });

  this.render = async () => {
    // 서버로부터 새로 전체 document 받아와서, sidebar setState 다시 하고, 다시 렌더링 => sidebar의 각 document 삭제되거나 그랬을 때, 이거 다시 호출해야되서 이를 콜백함수로 넘기거나 할 듯
    const documentList = await request(""); // 전체 document 조회 API
    sideBar.setState(documentList);
  };

  this.render();
}
