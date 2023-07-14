import { request } from "../utils/api.js";
import { initRouter } from "../utils/router.js";
import NotionEditPage from "./NotionEditPage.js";
import NotionPage from "./NotionPage.js";

export default function App({ $target }) {
  // 컨테이너 생성
  const $notionPageContainer = document.createElement("div");
  const $notionEditPageContainer = document.createElement("div");
  $notionPageContainer.className = "notionPageContainer";
  $notionEditPageContainer.className = "notionEditPageContainer";

  // 페이지 추가 버튼 생성
  const $addNewRootNotion = document.createElement("button");
  $addNewRootNotion.className = "addNewRootNotion";
  $addNewRootNotion.textContent = "+ 페이지 추가";

  // 노션 페이지 컨테이너 토글 버튼 생성
  const $toggleBtn = document.createElement("button");
  $toggleBtn.className = "toggle-btn1";
  $toggleBtn.innerHTML = `<i class="fa fa-solid fa-arrow-right" style="color: #000000;"></i>`;

  $target.appendChild($toggleBtn);
  $target.appendChild($notionPageContainer);
  $target.appendChild($notionEditPageContainer);
  $notionPageContainer.appendChild($addNewRootNotion);

  // 노션 페이지 컨포넌트
  const notionPage = new NotionPage({
    $target: $notionPageContainer,
    initialState: [],
    onClickNotion: (id) => {
      const { pathname } = window.location;
      const [, , notionId] = pathname.split("/");
      if (id !== notionId) {
        history.pushState(null, null, `/documents/${id}`);
        this.route();
      }
    },
    onAddNotion: (id) => {
      fetchAddNotion(id);
    },
    onDeleteNotion: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      history.replaceState(null, null, "/");
      this.route();
    },
    $editorPage: $notionEditPageContainer,
    $toggleBtn,
  });

  // 노션 에디터 페이지 컴포넌트
  const editorPage = new NotionEditPage({
    $target: $notionEditPageContainer,
    initialState: "",
    onRenderNotionPage: () => {
      notionPage.render();
    },
  });

  // 라우팅 처리
  this.route = () => {
    const { pathname } = window.location;

    // 홈 경로이면 노션 페이지만 렌더링, 그 외는 해당 노션 에디터 렌더링
    if (pathname === "/") {
      notionPage.render();
      editorPage.setState("");
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , notionId] = pathname.split("/");
      editorPage.setState({ notionId });
    }
  };

  this.route();

  initRouter(() => this.route());

  // 페이지 추가 후 서버 저장
  const fetchAddNotion = async (id = null) => {
    const createdNotion = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음",
        parent: id,
      }),
    });
    history.pushState(null, null, `/documents/${createdNotion.id}`);
    this.route();
    notionPage.render();
  };

  // 페이지 추가 이벤트 리스너
  $addNewRootNotion.addEventListener("click", () => {
    fetchAddNotion();
  });

  // 노션 페이지 토글 이벤트 리스너
  $toggleBtn.addEventListener("click", () => {
    $notionPageContainer.style.transform = "translateX(0)";
    $notionEditPageContainer.style.marginLeft = "0";
    $toggleBtn.style.transform = "translateX(-160%)";
  });
}
