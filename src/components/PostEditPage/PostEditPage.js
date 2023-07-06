import Editor from "./Editor.js";
import { fetchPost, fetchEditPost } from "../../utils/requestFetch.js";
import { CLASSNAME } from "../../utils/constants.js";

export default function PostEditPage({
  $target,
  initialState,
  postListUpdate,
}) {
  const $page = document.createElement("div");
  $page.className = CLASSNAME.EDIT_PAGE;

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;

    await fetchEditPost(this.state);

    const post = await fetchPost(this.state.id);
    await postListUpdate();
    editor.setState(post);

    await this.render();
  };

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: {},
    onEdit: (post) => {
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(async () => {
        await fetchEditPost(post);
        await postListUpdate();
      }, 1000);
    },
  });

  this.render = async () => {
    $target.appendChild($page);
  };
}
