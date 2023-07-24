import { getData, putData } from "../utils/api.js";
import Editor from "./Editor.js";
import { pushRouter } from "../utils/router.js";

export default function PostEditPage({ $target, initialState }) {
  const INTERVAL_SAVE_TIME = 2000;

  this.state = initialState;

  let timer = null;

  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const { postId } = this.state;
        if (postId && postId !== "new") {
          await putData(postId, post);
          pushRouter(`/documents/${postId}`);
          await getDocument();
        }
      }, INTERVAL_SAVE_TIME);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      this.state = nextState;
      await getDocument();
      return;
    } else {
      this.state = nextState;
    }

    editor.setState(
      this.state.post || {
        title: "",
        content: "",
      }
    );
  };

  const getDocument = async () => {
    const { postId } = this.state;
    if (postId) {
      const post = await getData(`/documents/${postId}`);

      this.setState({
        ...this.state,
        post,
      });
    }
  };
}
