export const createDomElement = (tagName, id = null) => {
  const newElement = document.createElement(tagName);
  if (id) {
    newElement.id = id;
  }
  return newElement;
};
