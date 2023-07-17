import { postDocument } from "../../../api/document.js";
import { PATH } from "../../../constants/path.js";
import { push } from "../../../utils/route.js";
import AddButton from "../../common/AddButton.js";

export default function DocumentList({
  parentElement,
  renderItemComponent,
  onAddButtonClick,
}) {
  if (!new.target) return new DocumentList(...arguments);

  const containerElement = document.createElement("div");
  const wrapperTopElement = document.createElement("div");

  containerElement.className = "document-list";
  wrapperTopElement.className = "document-list-top";

  const addButtonComponent = new AddButton({
    parentElement: wrapperTopElement,
    onClick: async () => {
      const newDocument = await postDocument({ titls: null, parent: null });
      onAddButtonClick({ ...newDocument, documents: [] });
      push(`${PATH.DOCUMENTS}/${newDocument.id}`);
    },
    text: "+",
    tooltipText: "페이지 추가",
  });

  this.render = () => {
    containerElement.innerHTML = ``;
    wrapperTopElement.innerHTML = `<span>페이지 목록</span>`;

    parentElement.append(containerElement);
    containerElement.append(wrapperTopElement);

    addButtonComponent.render();
    renderItemComponent(containerElement);
  };
}
