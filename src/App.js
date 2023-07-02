import EditPage from "./Components/EditPage.js";
import SideBar from "./Components/SideBar.js";
import { request } from "./utils/api.js";

export default function App({ target }) {
  const sideBar = new SideBar({ target, initialState: [] });
  new EditPage({ target });

  this.render = async () => {
    // 서버로부터 새로 전체 document 받아와서, sidebar setState 다시 하고, 다시 렌더링 => sidebar의 각 document 삭제되거나 그랬을 때, 이거 다시 호출해야되서 이를 콜백함수로 넘기거나 할 듯
    const documentList = await request(""); // 전체 document 조회 API
    console.log(documentList);
    sideBar.setState(documentList);
  };

  this.render();
}
