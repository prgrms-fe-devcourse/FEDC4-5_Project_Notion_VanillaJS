import {
  deletePost,
  getAllPosts,
  getPostById,
  postPost,
} from "./src/api/posts.js";
import LeftSection from "./src/components/domain/leftSection/index.js";

class App {
  constructor({ $target, initialState }) {
    this.$target = $target;
    this.state = initialState;

    this.leftSection = new LeftSection({
      $target,
      initialState,
      pageLoadToId: (id) => {
        history.pushState(null, null, id);
        this.router(id);
      },
      addNavSubDom: async ($target) => {
        const { id } = await postPost($target.dataset.id);
        const newData = await getAllPosts();

        this.leftSection.setState(newData);
        this.leftSection.setNavFocusBox(this.leftSection.findDOMById(id));
        history.pushState(null, null, id);
        this.router(id);
      },
      deleteNavDom: async (id) => {
        await deletePost(id);
        this.leftSection.setState(await getAllPosts());
        const nowPageIsDelete = location.pathname.substr(1) === id;

        // if (nowPageIsDelete) editer.setState(null);
      },
    });

    this.timer = null;
    this.timerDelay = 1000;
    // this.rightSection = new Editor({});
  }

  router = async (targetId) => {
    const { title, content, id } = await getPostById(targetId);
    this.leftSection.setNavFocusBox(this.leftSection.findDOMById(targetId));
    // this.rightSection.setState({ title, content, id });
  };
}

export default App;
