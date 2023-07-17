import Tooltip from "../../common/Tooltip.js";

export default function DocumentItem({
  parentElement,
  getChildDocument,
  onClickChildButton,
  onClickRemoveButton,
  onClickRoute,
  depthCount,
  ...documentData
}) {
  const containerElement = document.createElement("div");
  containerElement.className = "document-container toggle";
  containerElement.style.setProperty("--depth", depthCount > 8 ? 0 : "20px");

  const tooltipChildAddElement = new Tooltip({ text: "하위 페이지 추가" });
  const tooltipRemoveElement = new Tooltip({ text: "삭제" });

  containerElement.addEventListener("click", (e) => {
    if (Number(e.target.closest("li").id) !== documentData.id) return;

    if (e.target.closest(".child-button")) {
      return onClickChildButton(documentData.id);
    }

    if (e.target.closest(".remove-button")) {
      return onClickRemoveButton(documentData.id);
    }

    if (e.target.closest(".toggle-button")) {
      containerElement.classList.toggle("toggle");
      return;
    }

    onClickRoute(documentData.id);
  });

  containerElement.addEventListener("mouseover", (e) => {
    if (Number(e.target.dataset.id) !== documentData.id) return;

    if (e.target.closest(".child-button")) {
      tooltipChildAddElement.toggle(e.target);
    }

    if (e.target.closest(".remove-button")) {
      tooltipRemoveElement.toggle(e.target);
    }
  });

  containerElement.addEventListener("mouseout", (e) => {
    if (Number(e.target.dataset.id) !== documentData.id) return;

    if (e.target.closest(".child-button")) {
      tooltipChildAddElement.toggle(e.target);
    }

    if (e.target.closest(".remove-button")) {
      tooltipRemoveElement.toggle(e.target);
    }
  });

  this.render = () => {
    const { id, title } = documentData;
    parentElement.append(containerElement);

    containerElement.innerHTML = `
      <li id="${id}" class="document-item">
        <div class="toggle-button"></div>
        <span class="document-title">${title ?? "제목 없음"}</span>
        <div class="button-group-container">
          ${tooltipChildAddElement.render(
            `<div data-id="${id}" class="child-button">+</div>`
          )}
          ${tooltipRemoveElement.render(
            `<div data-id="${id}" class="remove-button">x</div>`
          )}
        </div>
      </li>
    `;

    getChildDocument(containerElement);
  };
}
