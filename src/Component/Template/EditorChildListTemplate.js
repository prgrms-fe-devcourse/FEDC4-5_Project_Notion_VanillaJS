export default function EditorChildListTemplate(documents) {
  return `
        <ul>
            ${documents
              .map((docs) => {
                return `<li>${docs.title}</li>`;
              })
              .join('')}
        </ul>
    `;
}
