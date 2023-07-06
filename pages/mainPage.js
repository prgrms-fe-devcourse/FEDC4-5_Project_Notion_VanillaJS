import DocumentList from "../components/DocumentList.js";
import Editor from "../components/Editor.js";
import { setItem, getItem, removeItem } from "../storage.js";
import { request } from "../utils/api.js";
import getChildTitleList from "../utils/getChildTitleList.js";
import getTitleList from "../utils/getTitleList.js";
import { push } from "../utils/router.js";

export default function MainPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "container";

  this.state = {
    documentList: [],
    postId: "new",
    post: {
      title: "",
      content: "",
    },
    titleList: [],
    childTitleList: [],
    isEditor: false,
    selectedDocument: "",
  };

  this.init = async (id) => {
    if (id === null) {
      this.setState({ ...this.state, isEditor: id });
    } else {
      this.setState({ ...this.state, isEditor: id, postId: id });
    }
    await fetchDocumentList();
    await fetchPost();
  };

  this.setState = (nextState) => {
    this.state = nextState;
    documentList.setState({
      documentList: this.state.documentList,
      selectedDocument: this.state.selectedDocument,
    });
    editor.setState({
      title: this.state.post.title,
      content: this.state.post.content,
      isEditor: this.state.isEditor,
      titleList: this.state.titleList,
      childTitleList: this.state.childTitleList,
    });
    this.render();
  };

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const documentList = new DocumentList({
    $target: $page,
    initialState: this.state.documentList,

    onClick: async (clickId) => {
      push(`/documents/${clickId}`);
      this.setState({ ...this.state, postId: clickId });
      fetchPost();
    },

    onAdd: async (clickId) => {
      const postDocument = await request("/", {
        method: "POST",
        body: JSON.stringify({
          title: "",
          parent: clickId,
        }),
      });
      await fetchDocumentList();
      push(`/documents/${postDocument.id}`);
    },

    onDelete: async (clickId) => {
      await request(`/${clickId}`, { method: "DELETE" });
      await fetchDocumentList();
      if (this.state.postId === clickId) {
        push("/");
      }
    },
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: this.state.post.title,
      content: this.state.post.content,
      isEditor: this.state.isEditor,
      titleList: this.state.titleList,
      childTitleList: this.state.childTitleList,
    },

    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        // postId가 new면 새로운 post를 생성
        const isNew = this.state.postId === "new";
        if (isNew) {
          const createPost = await request("/", {
            method: "POST",
            body: JSON.stringify(post),
          });

          history.replaceState(null, null, `/documents/${createPost.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            ...this.state,
            postId: createPost.id,
          });
        } else {
          const putPost = await request(`/${this.state.postId}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
          console.log("DB 수정 완료");
          // fetchDocumentList();
          this.setState({ ...this.state, post, selectedDocument: putPost });
          editor.render();
        }
      }, 1000);
    },
  });

  // 전체 폴더 목록을 가져오는 API 함수
  const fetchDocumentList = async () => {
    const newDocumentList = await request(`/`);
    const titleList = getTitleList(newDocumentList);

    this.setState({
      ...this.state,
      documentList: newDocumentList,
      titleList,
    });
  };

  // 특정 post를 가져오는 API 함수
  const fetchPost = async () => {
    const { postId } = this.state;

    if (postId !== "new") {
      const post = await request(`/${postId}`);
      const childTitleList = getChildTitleList(post);

      const tempPost = getItem(postLocalSaveKey, {
        title: "",
        content: "",
      });
      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updateAt) {
        if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
          this.setState({
            ...this.state,
            post: tempPost,
          });

          editor.render();
          return;
        }
      }
      this.setState({ ...this.state, post, childTitleList, selectedDocument: post });

      editor.render();
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
