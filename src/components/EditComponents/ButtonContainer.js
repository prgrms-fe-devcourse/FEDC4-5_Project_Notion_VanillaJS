import { push } from "../../util/router.js";

export default function ButtonContainer({
  $target,
  initalState = { documents: [{ id: null, title: null }] },
}) {
  if (!new.target)
    return new ButtonContainer({
      $target,
      initalState,
    });
  const $buttonContainer = document.createElement("artice");

  this.state = initalState;

  $target.appendChild($buttonContainer);

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  $buttonContainer.addEventListener("click", (e) => {
    const $button = e.target;
    const {
      dataset: { documentId },
    } = $button;

    if (documentId) {
      push(`/documents/${documentId}`, { method: "GET" });
      return;
    }
  });

  this.render = () => {
    const { documents } = this.state;
    console.log(documents);
    if (!documents.length) {
      $buttonContainer.innerHTML = `<p>document들이 없습니다</p>`;
      return;
    }
    $buttonContainer.innerHTML = `
      ${documents.map(
        ({ id, title }) =>
          `<button type="button" data-document-id="${id}">${title}</button>`
      )}
    `;
  };

  this.render();
}
