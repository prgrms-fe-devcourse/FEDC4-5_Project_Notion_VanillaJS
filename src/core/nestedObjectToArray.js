export default function nestedObjectToArray(nestedObject) {
  const nestedObjectArray = [];

  function recuresiveNestedObjectToArray(nestedObject, depth = 1) {
    nestedObject.forEach((document) => {
      if (document.documents.length !== 0) {
        nestedObjectArray.push({
          id: document.id,
          title: document.title,
          depth: depth,
        });
        recuresiveNestedObjectToArray(document.documents, depth + 1);
      } else {
        nestedObjectArray.push({
          id: document.id,
          title: document.title,
          depth: depth,
        });
      }
    });
  }

  recuresiveNestedObjectToArray(nestedObject);
  return nestedObjectArray;
}
