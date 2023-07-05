export default function DocumentItem({
  parentElement,
  getChildDocument,
  onClickChildButton,
  onClickRemoveButton,
  onClickRoute,
  ...documentData
}) {
  const containerElement = document.createElement("div");
  containerElement.className = "document-container";

  containerElement.addEventListener("click", (e) => {
    if (Number(e.target.closest("li").id) !== documentData.id) return;

    if (e.target.closest(".child-button")) {
      return onClickChildButton(documentData.id);
    }

    if (e.target.closest(".remove-button")) {
      return onClickRemoveButton(documentData.id);
    }

    onClickRoute(documentData.id);
  });

  this.state = "";

  this.render = () => {
    const { id, title } = documentData;
    parentElement.append(containerElement);

    containerElement.innerHTML = `
      <li id="${id}" class="document-item">
        <span class="document-title">${title ?? "제목 없음"}</span>
        <div class="button-group-container">
          <div data-id="${id}" class="child-button">+</div>
          <div data-id="${id}" class="remove-button">x</div>
        </div>      
      </li>
    `;

    getChildDocument(containerElement);
  };
}
