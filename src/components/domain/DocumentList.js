import { getDocuments, postDocument } from "../../api/document.js";
import { PATH } from "../../constants/path.js";
import { push } from "../../utils/route.js";
import AddButton from "../common/AddButton.js";

export default function DocumentList({
  parentElement,
  renderItemComponent,
  serverRender,
  onAddButtonClick,
}) {
  if (!new.target) return new DocumentList(...arguments);

  const containerElement = document.createElement("div");
  containerElement.className = "document-list";

  const addButtonComponent = new AddButton({
    parentElement: containerElement,
    onClick: async () => {
      const newDocument = await postDocument({ titls: null, parent: null });
      onAddButtonClick({ ...newDocument, documents: [] });
      push(`${PATH.DOCUMENTS}/${newDocument.id}`);
    },
    text: "추가 버튼",
  });

  this.state = [];

  this.getServer = async () => {
    const newState = await getDocuments();
    // this.state = newState;
    serverRender(newState);
    this.render();
  };

  this.render = () => {
    parentElement.append(containerElement);
    containerElement.innerHTML = `<span>페이지 목록</span>`;

    addButtonComponent.render();
    renderItemComponent(containerElement);
  };
}
