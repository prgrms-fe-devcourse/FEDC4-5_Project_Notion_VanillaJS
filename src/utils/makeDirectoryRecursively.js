export default function MakeDirectoryRecursively(documents){
  if(Array.isArray(documents) && documents.length === 0){
    return ``;
  }

  let ret = ``;

  documents.forEach(document => {
    const {title} = document;
    ret += `<ul><li>${title}</li>`
    ret += MakeDirectoryRecursively(document.documents);
    ret += `</ul>`
  })

  return ret;
}