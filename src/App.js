import PostPage from "./page/PostPage.js";
import EditPage from "./page/EditPage.js";
import { request } from "./util/api.js";
import { initRoute, push } from "./util/router.js";
import { getItem, setItem } from "./util/storaged.js";
import { NEW_POST_DATA, VISITED_LOCAL_KEY } from "./constant.js";
import {
  addDocuments,
  filterNewDocument,
  filterRemoveDocument,
  filterDocument,
} from "./util/dataset.js";

export default function App({ $target }) {
  if (!new.target) {
    return new App({ $target });
  }

  this.state = { selectedId: null, posts: [], selectedPost: {} };

  let timer = null;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    const { selectedId, posts, selectedPost } = this.state;
    postPage.setState({
      selectedId: selectedId ?? null,
      posts: posts || [],
    });
    editPage.setState({
      selectedId: selectedId ?? null,
      selectedPost: selectedPost || {},
    });
  };

  const onAdd = async (id) => {
    push(`/documents/new`);
    const visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []);
    setItem(VISITED_LOCAL_KEY, [...visitedDocumentsId, id]);
    const tempData = [...this.state.posts];
    addDocuments(tempData, id, NEW_POST_DATA);
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
      await fetchUpdate(`/documents/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
      });
    }, 2000);
  };

  const onDelete = async (id) => {
    if (!confirm("페이지를 삭제하시겠습니까?")) return;
    const tempData = [...this.state.posts];
    const filterPost = filterRemoveDocument(tempData, id);
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
    this.setState({
      selectedId: createDocument.id,
      posts: updateData,
      post: createDocument,
    });
  };

  const fetchUpdate = async (url, options) => {
    const updatePost = await request(url, options);
    const tempData = [...this.state.posts];
    filterDocument(tempData, updatePost);
    this.setState({ post: updatePost });
  };

  const postPage = new PostPage({
    $target,
    initalState: { post: this.state.post },
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
    const visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []);
    setItem(VISITED_LOCAL_KEY, [...visitedDocumentsId, parseInt(postId)]);
    this.setState({
      selectedId: parseInt(postId) === NaN ? postId : parseInt(postId),
    });
  };

  initRoute(() => this.route());

  window.addEventListener("popstate", () => this.route());
  if (location.pathname.includes(`/documents/`)) push(`/`);
  this.route();
}
