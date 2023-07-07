import { request } from "./api.js";
import Editor from "./Editor.js";

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
        if (this.state.postId) {
          await request(`/documents/${this.state.postId}`, {
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
      await fetchPost();
      return;
    } else {
      this.state = nextState;
      this.render();
    }

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

    if (postId) {
      const post = await request(`/documents/${postId}`);

      this.setState({
        ...this.state,
        post,
      });
    }
  };
}
