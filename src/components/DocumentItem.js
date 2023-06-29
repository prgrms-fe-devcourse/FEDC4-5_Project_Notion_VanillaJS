import Component from "../core/Component";
import { request } from "../main";

export default class DocumentItem extends Component {
  constructor() {
    super({
      state: {
        id: null,
        title: "제목 없음",
      },
    });
  }
  render() {
    this.el.innerHTML = `
    <a class="docuTitle">${this.state.title}</a>
    <a>${this.state.id}</a>
    <button class="createChildDocu">"+"</button>
    <button class="deleteDocuBtn">"-"</button>
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
  }
}
