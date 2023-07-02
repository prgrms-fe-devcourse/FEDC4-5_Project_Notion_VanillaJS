import { postDocument } from "../../api/document.js";
import { PATH } from "../../constants/path.js";
import { push } from "../../utils/route.js";
import AddButton from "../common/AddButton.js";

export default function DocumentList({ appElement, renderItemComponent }) {
  if (!new.target) return new DocumentList(...arguments);

  const containerElement = document.createElement("div");
  const addButtonComponent = new AddButton({
    parentElement: containerElement,
    onClick: async () => {
      const data = await postDocument({ titls: null, parent: null });
      push(`${PATH.DOCUMENTS}/${data.id}`);
    },
  });

  this.render = () => {
    appElement.append(containerElement);
    containerElement.innerHTML = `<span>페이지 목록</span>`;

    addButtonComponent.render();
    renderItemComponent(containerElement);
  };
}
