import Component from "../core/Component";
import { request } from "../main";

export default class Post extends Component {
  constructor(postId) {
    super({
      state: {
        id: postId,
        title: "",
        content: "",
        updatedAt: null,
        createdAt: null,
      },
    });
    request(`${postId}`).then((value) => {
      this.setState({ ...value });
    });
  }
  render() {}
}
