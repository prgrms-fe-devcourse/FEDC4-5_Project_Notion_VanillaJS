import { deletePost, getAllPosts, postPost } from "./src/api/posts.js";
import LeftSection from "./src/components/domain/leftSection/index.js";

class App {
  constructor({ $target, initialState }) {
    this.$target = $target;
    this.state = initialState;

    this.leftSection = new LeftSection({
      $target,
      initialState,
      loadPageById: (id) => {},
      addSubDir: async ($target) => {},
      deleteNavDOM: async (id) => {},
    });

    this.timer = null;
    this.timerDelay = 1000;
    // this.rightSection = new Editor({});
  }

  router = async (targetId) => {
    const { title, content, id } = await getPostById(targetId);
    this.leftSection.setNavFocusBox(this.leftSection.findDOMById(targetId));
    this.rightSection.setState({ title, content, id });
  };
}

export default App;
