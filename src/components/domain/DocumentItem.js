import { PATH } from "../../constants/path.js";
import { push } from "../../utils/route.js";

export default function DocumentItem({
  parentElement,
  getChildDocument,
  onClickChildButton,
  onClickRemoveButton,
  ...documentData
}) {
  const containerElement = document.createElement("div");

  containerElement.addEventListener("click", (e) => {
    if (Number(e.target.closest("li").id) !== documentData.id) return;

    if (e.target.closest(".child-button")) {
      return onClickChildButton(documentData.id);
    }

    if (e.target.closest(".remove-button")) {
      return onClickRemoveButton(documentData.id);
    }

    push(`${PATH.DOCUMENTS}/${documentData.id}`);
  });

  this.render = () => {
    const { id, title } = documentData;
    parentElement.append(containerElement);

    containerElement.innerHTML = `
      <li id="${id}" class="document-item">
        <span>${title ?? "제목 없음"}</span>
        <div data-id="${id}" class="child-button">🆕</div>
        <div data-id="${id}" class="remove-button">❌</div>
      </li>
    `;

    getChildDocument(containerElement);
  };
}
