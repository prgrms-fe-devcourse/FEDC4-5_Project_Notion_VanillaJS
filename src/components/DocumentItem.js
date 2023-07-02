import Component from "../core/Component";
import { request } from "../main";

export default class DocumentItem extends Component {
  constructor() {
    super({
      tagName: "ul",
      state: {
        id: null,
        title: "제목 없음",
      },
    });
  }
  render() {
    this.el.innerHTML = `
      <li>
        <a class="docuTitle">${this.state.title}</a>
        <a>${this.state.id}</a>
        <button class="createChildDocu">"+"</button>
        <button class="deleteDocuBtn">"-"</button>
      </li>
    `;

    const deleteDocuBtnEl = this.el.querySelector(".deleteDocuBtn");
    deleteDocuBtnEl.addEventListener("click", () => {
      request(`${this.state.id}`, {
        method: "DELETE",
      }).then(() => {
        console.log("삭제 성공!");
      });
      this.el.remove();
    });

    const createChildDocuBtnEl = this.el.querySelector(".createChildDocu");
    createChildDocuBtnEl.addEventListener("click", () => {
      const res = request("", {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: `${this.state.id}`,
        }),
      });
      const childDocuItem = new DocumentItem();
      res.then((value) => {
        childDocuItem.setState({ id: value.id, title: value.title });
        this.el.appendChild(childDocuItem.el);
      });
    });
  }
}
