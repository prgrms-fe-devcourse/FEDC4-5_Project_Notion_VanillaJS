export default function MakeDirectoryRecursively(documents, selectedId){
  if(!Array.isArray(documents) || documents.length === 0){
    return ``;
  }

  let ret = ``;

  documents.forEach(document => {
    const {title, id} = document;
    ret += `
    <ul>
      <li data-id="${id}" ${id === selectedId ? 'class="selected-document"' : ''}>
        <span ${id === selectedId ? 'class="selected-document-span"' : ''}>${title}</span>
        <button class="add-document">+</button>
        <button class="delete-document">X</button>
      </li>
    `
    ret += MakeDirectoryRecursively(document.documents, selectedId);
    ret += `</ul>`
  })

  return ret;
}