import { request } from "./api.js";
import Editor from "./Editor.js";
import { pushRouter } from "./router.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.id = "editPage";

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
          pushRouter(`/${this.state.postId}`);
          await getDocument();
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      this.state = nextState;
      await getDocument();
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

  const getDocument = async () => {
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
