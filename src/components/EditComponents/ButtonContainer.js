import { isLength } from "../../util/prevent.js";
import { push } from "../../util/router.js";
import Button from "../Button.js";

export default function ButtonContainer({ $target, initalState }) {
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

  this.render = () => {
    const { documents } = this.state;
    $buttonContainer.innerHTML = "";

    if (!isLength(documents)) {
      $buttonContainer.innerHTML = `<p>document들이 없습니다</p>`;
      return;
    }

    const $fakeDocument = document.createDocumentFragment();

    documents.forEach(
      ({ id, title }) =>
        new Button({
          $target: $fakeDocument,
          initalState: {
            text: title,
            id,
            type: "button",
            className: "buttonContainer_item",
          },
          onEvent: (id) => push(`/documents/${id}`, { method: "GET" }),
        })
    );

    $buttonContainer.appendChild($fakeDocument);
  };

  this.render();
}
