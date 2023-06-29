export default function MakeDirectoryRecursively(documents){
  if(!Array.isArray(documents) || documents.length === 0){
    return ``;
  }

  let ret = ``;

  documents.forEach(document => {
    const {title, id} = document;
    ret += `<ul><li data-id="${id}">${title}<button class="add-document">+</button></li>`
    ret += MakeDirectoryRecursively(document.documents);
    ret += `</ul>`
  })

  return ret;
}