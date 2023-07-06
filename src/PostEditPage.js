import { request } from "./api.js";
import Editor from "./Editor.js";
import LinkButton from "./LinkButton.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: "",
      content: "",
    },
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const isNew = this.state.postId === "new";

        if (isNew) {
          const createdPost = await request("", {
            method: "POST",
            body: JSON.stringify({
              title: post.title,
              parent: null,
            }),
          });
          history.replaceState(null, null, `/${createdPost.id}`);

          this.setState({
            ...post,
            postId: createdPost.id,
          });
        } else {
          await request(`/${this.state.postId}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      this.state = nextState;

      if (this.state.postId === "new") {
        this.render();
        editor.setState({
          title: "",
          content: "",
        });
      } else {
        await fetchPost();
      }
      return;
    }

    this.state = nextState;
    this.render();

    editor.setState(
      this.state.post || {
        title: "",
        content: "",
      }
    );
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { postId } = this.state;

    if (postId !== "new") {
      const post = await request(`/${postId}`);

      this.setState({
        ...this.state,
        post,
      });
    }
  };

  new LinkButton({
    $target: $page,
    initialState: {
      text: "목록으로 이동",
      link: "/",
    },
  });
}
