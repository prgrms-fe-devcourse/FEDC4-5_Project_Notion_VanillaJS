import Component from "../core/Component";
import Post from "./Post";
import { getItem, setItem } from "../core/Storage";
import { request } from "../main";

export default class Editor extends Component {
  constructor(postId) {
    super({
      state: {
        postId,
      },
    });
  }
  render() {
    const post = new Post(this.state.postId);
    if (post.state.updatedAt === null) {
      post.setState(getItem(this.state.postId));
    }
    this.el.innerHTML = `
        <div class="editor-view">
          <input class="title" placeholder="제목 없음" value="${post.state.title}"/>
          <textarea class="content" placeholder="Input Something...">${post.state.content}</textarea>
        </div>
        `;
    this.el.setAttribute("id", "editor-app");

    const editorViewEl = this.el.querySelector(".editor-view");
    const titleEl = this.el.querySelector(".title");

    let timer = null;
    editorViewEl.addEventListener("input", (event) => {
      const { target } = event;
      const inputCategory = target.getAttribute("class");
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        const currentWriting = {
          ...post.state,
          [inputCategory]: target.value,
          updatedAt: new Date(),
        };
        post.setState(currentWriting);
        setItem(post.state.id, currentWriting);
        savePostOnServer(post.state.id, currentWriting);
      }, 1000);
    });

    titleEl.addEventListener("keyup", (event) => {
      const { target } = event;
      document.getElementById(post.state.id).innerText = target.value;
    });

    const savePostOnServer = (id, post) => {
      const { title, content } = post;
      request(`${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
      });
    };
  }
}
