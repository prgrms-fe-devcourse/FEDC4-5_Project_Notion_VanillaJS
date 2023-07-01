export default function DocumentList({ appElement, renderItemComponent }) {
  if (!new.target) return new DocumentList(...arguments);

  const containerElement = document.createElement("div");

  this.render = () => {
    appElement.append(containerElement);
    containerElement.innerHTML = ``;
    renderItemComponent(containerElement);
  };
}
