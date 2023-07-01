import { push } from "../../utils/route.js";

export default function DocumentItem({ parentElement, ...data }) {
  const containerElement = document.createElement("div");

  containerElement.addEventListener("click", (e) => {
    if (e.target.closest(".child-button")) {
      alert("child");
      return;
    }

    if (e.target.closest("li")) {
      push(`/document/edit?document-id=${e.target.id}`);
    }
  });

  this.render = () => {
    parentElement.append(containerElement);

    containerElement.innerHTML = `
      <li id="${data.id}" class="document-item">
        ${data.title === null ? "제목 없음" : data.title}
        <div class="child-button">🆕</div>
      </li>
    `;
  };
}
