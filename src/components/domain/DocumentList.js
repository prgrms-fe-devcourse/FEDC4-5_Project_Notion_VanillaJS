import { getDocuments } from "../../api/document.js";

export default function DocumentList({ appElement }) {
  if (!new.target) return new DocumentList(...arguments);

  const containerElement = document.createElement("div");

  this.render = async () => {
    appElement.append(containerElement);

    const list = await getDocuments();

    containerElement.innerHTML = `
      ${list
        .map(
          (item) =>
            `<li id="${item.id}">${
              item.title === null ? "제목 없음" : item.title
            }</li>`
        )
        .join("")}
    `;
  };
}
