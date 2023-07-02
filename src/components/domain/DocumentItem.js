import { deleteDocument, postDocument } from "../../api/document.js";
import { PATH } from "../../constants/path.js";
import { push } from "../../utils/route.js";

export default function DocumentItem({
  parentElement,
  getChildDocument,
  ...data
}) {
  const containerElement = document.createElement("div");

  containerElement.addEventListener("click", async (e) => {
    if (e.target.closest(".child-button")) {
      if (Number(e.target.dataset.id) === data.id) {
        const temp = await postDocument({ title: null, parent: data.id });

        console.log(temp);
        return;
      }
    }

    if (e.target.closest(".remove-button")) {
      if (Number(e.target.dataset.id) === data.id) {
        await deleteDocument(data.id);
        return;
      }
    }

    if (Number(e.target.closest("li").id) === data.id) {
      push(`${PATH.DOCUMENTS}/${data.id}`);
    }
  });

  this.render = () => {
    parentElement.append(containerElement);

    containerElement.innerHTML = `
      <li id="${data.id}" class="document-item">
        <span>${data.title === null ? "제목 없음" : data.title}</span>
        <div data-id="${data.id}" class="child-button">🆕</div>
        <div data-id="${data.id}" class="remove-button">❌</div>
      </li>
    `;

    getChildDocument(containerElement);
  };
}
