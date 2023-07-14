import Editor from "./Editor.js";
import { request } from "../utils/api.js";

export default function NotionEditPage({ $target, initialState, onRenderNotionPage }) {
  const $page = document.createElement("div");
  $page.className = "notionEditPage";

  $target.appendChild($page);

  this.state = initialState;

  this.setState = async (nextState) => {
    if (nextState === "") {
      editor.setState(nextState);
    } else {
      const previousState = this.state;
      this.state = nextState;
      if (previousState.notionId !== nextState.notionId) {
        await fetchNotion();
        return;
      }
      this.render();
      editor.setState(this.state.notion);
    }
  };

  let timer = null;

  // 에디터 컴포넌트
  const editor = new Editor({
    $target: $page,
    initialState: this.state,
    // 편집 후 2초간 정지 시 서버로 저장
    onEditing: (notion) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      if (notion.title === "") {
        notion.title = "제목 없음";
      }
      timer = setTimeout(async () => {
        await request(`/documents/${this.state.notionId}`, {
          method: "PUT",
          body: JSON.stringify(notion),
        });
        onRenderNotionPage();
      }, 2000);
    },
  });

  this.render = () => {
    editor.render();
  };

  this.render();

  // id값별로 해당 노션을 서버에서 받아오기 (빈 문자열이면 실행 안됨)
  const fetchNotion = async () => {
    const { notionId } = this.state;

    if (notionId !== "") {
      const notion = await request(`/documents/${notionId}`);
      this.setState({
        ...this.state,
        notion,
      });
    }
  };
}
