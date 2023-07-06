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
    postPage.setState(this.state);
    editPage.setState({ selectedId: this.state.selectedId || null });
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

  const filterRemoveDocument = (posts, id) => {
    const filterData = [];
    for (const post of posts) {
      const { id: postId, title, documents } = post;
      if (postId !== id) {
        const filterItem = {
          id: postId,
          title,
          documents: filterRemoveDocument(documents, id),
        };
        filterData.push(filterItem);
      }
    }
    return filterData;
  };

  const onAdd = async (id) => {
    console.log(id);
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
    const createDocument = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "Untitle",
        parent: id === "new" ? null : id,
      }),
    });
    history.replaceState(null, null, `/documents/${createDocument.id}`);
    visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []).map((visited) =>
      visited === "new" ? createDocument.id : visited
    );
    setItem(VISITED_LOCAL_KEY, visitedDocumentsId);
    const updateData = [...this.state.posts];
    filterNewDocument(updateData, createDocument.id);
    this.setState({ selected: createDocument.id, posts: updateData });
  };

  const onEdit = (post) => {
    // 수정된 데이터 전체 전달
  };

  const onDelete = async (id) => {
    // 삭제된 데이터 전체 전달
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
    await request(`/documents/${id}`, { method: "DELETE" });
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
      console.log(posts);
      this.setState({ posts });
      return;
    }
    const [, , postId] = pathname.split("/");
    this.setState({
      selectedId: parseInt(postId) === NaN ? postid : parseInt(postId),
    });
  };

  initRoute(() => this.route());

  window.addEventListener("popstate", () => this.route());
  this.route();
}
