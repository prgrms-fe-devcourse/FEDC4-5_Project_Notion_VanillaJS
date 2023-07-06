import PostList from "./PostList.js";
import PostListHeader from "./PostListHeader.js";
import {
  fetchGetLists,
  fetchCreatePost,
  fetchDeletePost,
} from "../../utils/requestFetch.js";
import { push } from "../../utils/router.js";
import { CLASSNAME } from "../../utils/constants.js";

export default function PostListPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = CLASSNAME.POST_LIST_PAGE;

  const $button = document.createElement("button"); // 하단 페이지 생성 버튼
  $button.className = CLASSNAME.NEW_POST_BTN;
  $button.textContent = "+ 새 페이지";

  $button.addEventListener("click", async (e) => {
    const newPost = await fetchCreatePost({
      title: "제목 없음",
      parent: null,
    });
    push(`/documents/${newPost.id}`);
  });

  this.state = initialState;

  this.setState = async () => {
    this.state = await fetchGetLists();
    postList.setState(this.state);
    this.render();
  };

  new PostListHeader({
    $target: $page,
  });

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onEditPost: (id) => push(`/documents/${id}`),
    onCreateSubPost: async (parentId) => {
      const newPost = await fetchCreatePost({
        title: "제목 없음",
        parent: parentId,
      });
      push(`/documents/${newPost.id}`);
    },
    onDeletePost: async (id) => {
      if (confirm("페이지를 삭제하시겠습니까?")) {
        await fetchDeletePost(id);
        push("/");
      }
    },
  });

  this.render = () => {
    $target.appendChild($page);
    $target.appendChild($button);
  };

  this.render();
}
