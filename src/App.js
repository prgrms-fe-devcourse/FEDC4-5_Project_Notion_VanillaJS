import PostPage from "./components/page/PostPage.js";
import { request } from "./util/api.js";
import { initRoute, push } from "./util/router.js";
import { getItem, setItem } from "./util/storaged.js";
import { VISITED_LOCAL_KEY } from "./constant.js";
import {
  addDocuments,
  filterNewDocument,
  filterRemoveDocument,
  filterDocument,
} from "./util/dataset.js";
import EditPage from "./components/page/EditPage.js";
export default function App({
  $target,
  initalState = {
    selectedId: null,
    posts: [],
    post: {},
  },
}) {
  if (!new.target)
    new App({
      $target,
      initalState: {
        selectedId: null,
        posts: [],
        post: {},
      },
    });

  this.state = initalState;

  let timer = null;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    editPage.setState({
      selectedId: this.state.selectedId || null,
      post: this.state.post || {},
    });
    postPage.setState({
      selectedId: this.state.selectedId || null,
      posts: this.state.posts || [],
    });
  };

  const onAdd = async (id) => {
    push(`/documents/new`);
    const newData = {
      id: "new",
      title: "Untitle",
      documents: [],
    };
    const visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []);
    setItem(VISITED_LOCAL_KEY, [...visitedDocumentsId, id]);
    const tempData = [...this.state.posts];
    addDocuments(tempData, id, newData);
    this.setState({ selectedId: "new", posts: tempData });
    await fetchAdd(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "Untitle",
        parent: id === "new" ? null : id,
      }),
    });
  };

  const onEdit = ({ id, title, content }) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      setItem(
        `temp-${this.state.selectedId === id ? "new" : this.state.selectedId}`,
        { title, content }
      );
      const tempData = [...this.state.posts];
      filterDocument(tempData, { id, title, content });
      this.setState({ selectedId: id, posts: tempData });
      const fetchUpdateData = await request(`/documents/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const updateData = [...this.state.posts];
      filterDocument(updateData, { id, title, content });
      this.setState({
        selectedId: id,
        posts: updateData,
        post: fetchUpdateData,
      });
    }, 2000);
  };

  const onDelete = async (id) => {
    if (!confirm("페이지를 삭제하시겠습니까?")) return;
    const tempData = [...this.state.posts];
    const filterPost = filterRemoveDocument(tempData, id);
    // 루트말고 해당 docuemtd의 root를 가리쳐볼까?
    this.state.selectedId === id
      ? this.setState({ selectedId: this.state.posts[0].id, posts: filterPost })
      : this.setState({ posts: filterPost });
    const visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []).filter(
      (visited) => visited !== id
    );
    setItem(VISITED_LOCAL_KEY, visitedDocumentsId);
    await fetchDelete(`/documents/${id}`, { method: "DELETE" }, id, filterPost);
  };

  const fetchDelete = async (url, options, id, filterPost) => {
    await request(url, options);
    const visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []).filter(
      (visited) => visited !== id
    );
    setItem(VISITED_LOCAL_KEY, visitedDocumentsId);
    this.state.selectedId === id
      ? this.setState({ selectedId: this.state.posts[0].id, posts: filterPost })
      : this.setState({ posts: filterPost });
  };

  const fetchAdd = async (url, options) => {
    const createDocument = await request(url, options);
    history.replaceState(null, null, `/documents/${createDocument.id}`);
    const visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []).map((visited) =>
      visited === "new" ? createDocument.id : visited
    );
    setItem(VISITED_LOCAL_KEY, visitedDocumentsId);
    const updateData = [...this.state.posts];
    filterNewDocument(updateData, createDocument.id);
    this.setState({ selectedId: createDocument.id, posts: updateData });
  };

  const postPage = new PostPage({
    $target,
    initalState,
    onAdd,
    onDelete,
  });

  const editPage = new EditPage({
    $target,
    initalState: { selectedId: null, post: {} },
    onEdit,
  });

  this.route = async () => {
    const { pathname } = location;
    if (pathname === "/") {
      const posts = await request("/documents", { method: "GET" });
      this.setState({ posts });
      return;
    }
    const [, , postId] = pathname.split("/");
    this.setState({
      selectedId: parseInt(postId) === NaN ? postId : parseInt(postId),
    });
  };

  initRoute(() => this.route());

  window.addEventListener("popstate", () => this.route());
  // 새로고침시 this.route() 실행

  this.route();
}
