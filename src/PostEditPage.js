import Editor from "./Editor.js";
import { setItem, getItem, removeItem } from "./storage.js";
import { getApi, postApi, putApi } from "./api.js";
import { makeNewPost } from "./btnCustomEvent.js";

export default function PostEditPage({ $target, initialState, username }) {
  const $page = document.createElement("div");

  this.state = initialState;

  let postLocalSaveKey = `temp-document-${this.state.id}`;

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: this.state.post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          saveDate: new Date(),
        });

        // const isNew = this.state.id === "new";
        // if (isNew) {
        //   const createdPost = await postApi(username);
        //   history.replaceState(null, null, `/${createdPost.id}`); // url을 new에서 생성된 id로 바꾸기
        //   removeItem(postLocalSaveKey); // local storage에서 temp-document-new 지우기

        //   this.setState({
        //     id: createdPost.id,
        //   });
        // } else {
        const { id, title, content } = post;
        await putApi(username, id, title, content);
        removeItem(postLocalSaveKey);
        // }
      }, 200);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id && nextState.id !== "root") {
      postLocalSaveKey = `temp-post-${nextState.id}`;
      this.state = nextState;
      if (this.state.id === "new") {
        const post = getItem(postLocalSaveKey, {
          title: "",
          content: "",
        });
        this.render();
        editor.setState(post);
      } else {
        await fetchPost();
      }
      return;
    }
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
    console.log(this.state.post);
    if (this.state.post) {
      editor.setState(this.state.post);
    } else {
      editor.setState(
        this.state.id === "root"
          ? {
              title: `${username}의 노션 클로닝 페이지`,
              content: `${username}의 노션에 오신 것을 환영합니다!\n\n당연히 노션 작성법은 알고 계시겠죠??\n\nmarkdown 규정에 맞춰 작성해주세요!`,
            }
          : {
              title: "",
              content: "",
            }
      );
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { id } = this.state;
    if (id !== "root" && id !== "new") {
      const post = await getApi(username, id);

      // const tempPost = getItem(postLocalSaveKey, {
      //   title: "",
      //   content: "",
      // });

      // // 아직 저장이 되지 않았는데, 새로고침 할 때
      // if (tempPost.saveDate && tempPost.saveDate > post.updatedAt) {
      //   if (confirm("저장되지 않은 임시 데이터가 있네용, 불러올까여?")) {
      //     this.setState({
      //       ...this.state,
      //       post: tempPost,
      //     });
      //     return;
      //   }
      // }

      this.setState({
        ...this.state,
        post,
      });
      console.log(this.state);
    }
  };

  const newPost = async (id) => {
    const createdPost = await postApi(username, id);
    history.replaceState(null, null, `/${createdPost.id}`); // url을 new에서 생성된 id로 바꾸기
    removeItem(postLocalSaveKey); // local storage에서 temp-document-new 지우기
    console.log(this.state.id, createdPost.id);
    this.setState({
      id: createdPost.id,
    });
  };
  makeNewPost((id) => newPost(id));
}
