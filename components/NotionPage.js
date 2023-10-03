import NotionList from "./NotionList.js";
import { request } from "../utils/api.js";
import ToggleButton from "./ToggleButton.js";

export default function NotionPage({
  $target,
  initialState,
  onClickNotion,
  onAddNotion,
  onDeleteNotion,
  $editorPage,
  $toggleBtn,
}) {
  const $page = document.createElement("div");
  $page.className = "notionPage";

  $target.appendChild($page);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 토글 버튼 컴포넌트
  new ToggleButton({
    $target: $page,
    onClickButton: () => {
      $target.style.transform = "translateX(-100%)";
      $editorPage.style.marginLeft = "-110px";
      $toggleBtn.style.transform = "translateX(0)";
    },
  });

  // 노션 리스트 컴포넌트
  const notionList = new NotionList({
    $target: $page,
    initialState: this.state,
    onClickNotion,
    onAddNotion,
    onDeleteNotion,
  });

  this.render = () => {
    fetchNotionList();
  };

  // 서버에서 노션 리스트 받아오기
  const fetchNotionList = async () => {
    const storedNotions = await request("/documents");
    notionList.setState(storedNotions);
  };

  this.render();
}
