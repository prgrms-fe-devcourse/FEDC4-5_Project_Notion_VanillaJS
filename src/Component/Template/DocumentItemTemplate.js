export default function DocumentItemTemplate({ documentId, documentTitle }) {
  return `
      <li data-id = ${documentId} class = "document">
      ${documentTitle}
      </li>
      <span class = "dropdown">
      ...
      <button data-id = ${documentId} class = "documentDeleteBtn">X</button>
      <button data-id = ${documentId} class = "documentAddBtn">+</button>
      </span>
    `;
}
