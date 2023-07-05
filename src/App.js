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

  const addDocuments = (posts, id, newData) => {
    if (id === "new") {
      posts.push(newData);
      return;
    }
    for (const post of posts) {
      if (post.id === id) {
        post.documents.push(newData);
        return;
      }
      addDocuments(post.documents, id, newData);
    }
    return;
  };

  const filterNewDocument = (posts, id) => {
    for (const post of posts) {
      if (post.id === "new") {
        post.id = id;
        return;
      }
      filterNewDocument(post.documents, id);
    }
  };

  const onAdd = async (id) => {
    push(`/documents/new`);
    const newData = {
      id: "new",
      title: "Untitle",
      documents: [],
    };
    let visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []);
    setItem(VISITED_LOCAL_KEY, [...visitedDocumentsId, id]);
    const tempData = [...this.state.posts];
    addDocuments(tempData, id, newData);
    this.setState({ selectedId: "new", posts: tempData });
    postPage.setState({ ...this.state });
    editPage.setState({ selectedId: "new" });
    const createDocument = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({ title: "Untitle", parent: id }),
    });
    visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []).map((visited) => {
      if (visited === "new") return createDocument.id;
      return visited;
    });
    const as = [...this.state.posts];
    filterNewDocument(as, createDocument.id);
    setItem(VISITED_LOCAL_KEY, visitedDocumentsId);
    this.setState({ ...this.state, selectedId: createDocument.id });
    postPage.setState({ ...this.state, selectedId: createDocument.id });
    editPage.setState({ selectedId: createDocument.id });
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
