import PostPage from "./components/page/PostPage.js";
import { request } from "./util/api.js";
import { initRoute, push } from "./util/router.js";
import { getItem, setItem } from "./util/storaged.js";
import { VISITED_LOCAL_KEY } from "./constant.js";
import EditPage from "./components/page/EditPage.js";
export default function App({
  $target,
  initalState = {
    selectedId: null,
    posts: [],
  },
}) {
  if (!new.target)
    new App({
      $target,
      initalState: {
        selectedId: null,
        posts: [],
      },
    });

  this.state = initalState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
  };

  const addDocuments = (posts, id) => {
    for (const post of posts) {
      if (post.id === id) {
        const newData = {
          id: "new",
          title: "Untitle",
          documents: [],
        };
        post.documents.push(newData);
        return;
      }
      addDocuments(post.documents, id);
    }
  };

  const onAdd = async (id) => {
    // 낙관적 업데이트
    const visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []);
    setItem(VISITED_LOCAL_KEY, [...visitedDocumentsId, id]);
    const tempData = [...this.state.posts];
    addDocuments(tempData, id);
    this.setState({ selectedId: "new", posts: tempData });
    postPage.setState({ ...this.state });
    editPage.setState({ selectedId: "new" });
    // fetch로 요청하기
    // push("/new");
    // const newData = await request("/documents", { method: "POST",body:JSON.stringify()});
  };

  const onEdit = (id) => {
    // 수정된 데이터 전체 전달
  };

  const onDelete = (id) => {
    // 삭제된 데이터 전체 전달
  };

  const postPage = new PostPage({
    $target,
    initalState,
    onAdd,
    onDelete,
  });

  const editPage = new EditPage({
    $target,
    initalState,
    onEdit,
  });

  editPage.render();

  this.route = async () => {
    const { pathname } = location;
    if (pathname === "/") {
      const posts = await request("/documents", { method: "GET" });
      this.setState({ posts });
      postPage.setState({ posts });
    }
  };

  initRoute(() => this.route());

  this.route();
}
