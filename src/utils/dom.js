import {
  setSpreadDocumentToStorage,
  getSpreadDocumentFromStorage,
} from "./storage.js";

export const createDomElementWithId = (tagName, id = null, text = null) => {
  const newElement = document.createElement(tagName);
  if (id) {
    newElement.id = id;
  }

  if (text) {
    newElement.text = text;
  }
  return newElement;
};

export const createDomElementWithClass = (
  tagName,
  className = null,
  text = null
) => {
  const newElement = document.createElement(tagName);
  if (className) {
    newElement.classList.add(className);
  }

  if (text) {
    newElement.text = text;
  }

  return newElement;
};

export const createDocumentElement = (document, spreadDocumentList) => {
  const documentItem = createDomElementWithClass("div", "documentItem");
  documentItem.id = document.id;

  const documentContent = createDomElementWithClass("div", "documentContent");
  documentItem.appendChild(documentContent);
  documentContent.innerHTML = `
      <button class="spreadButton">❯</button>
      <div class="documentTitle">${document.title}</div>
      <button class="addChildDocumentButton">+</button>
      <button class="deleteDocumentButton">x</button>
  `;

  const childDocumentList = createDomElementWithClass(
    "div",
    "childDocumentList"
  );
  documentItem.appendChild(childDocumentList);

  if (
    spreadDocumentList &&
    spreadDocumentList.includes(document.id.toString())
  ) {
    childDocumentList.style.display = "flex";
    documentItem.querySelector(".spreadButton").innerHTML = "v";
  } else {
    childDocumentList.style.display = "none";
    documentItem.querySelector(".spreadButton").innerHTML = "❯";
  }

  if (document.documents) {
    document.documents.forEach((document) => {
      childDocumentList.appendChild(
        createDocumentElement(document, spreadDocumentList)
      );
    });
  }

  return documentItem;
};

export const toggleDisplay = (element) => {
  if (element) {
    element.style.display === "flex"
      ? (element.style.display = "none")
      : (element.style.display = "flex");
  }
};

export const toggleSpreadIcon = (element) => {
  if (element) {
    element.innerHTML === "v"
      ? (element.innerHTML = "❯")
      : (element.innerHTML = "v");
  }
};

export const toggleToSpreadDoucmentList = (documentId) => {
  const spreadDocumentList = getSpreadDocumentFromStorage();

  if (spreadDocumentList && spreadDocumentList.includes(documentId)) {
    const newList = spreadDocumentList.filter(
      (spreadId) => spreadId !== documentId
    );
    setSpreadDocumentToStorage(newList);
  } else {
    if (spreadDocumentList) {
      setSpreadDocumentToStorage([...spreadDocumentList, documentId]);
    } else {
      setSpreadDocumentToStorage([documentId]);
    }
  }
};

export const removeFromSpreadDoucmentList = (documentId) => {
  const spreadDocumentList = getSpreadDocumentFromStorage();
  if (spreadDocumentList && spreadDocumentList.includes(documentId)) {
    const newList = spreadDocumentList.filter(
      (spreadId) => spreadId !== documentId
    );
    setSpreadDocumentToStorage(newList);
  }
};

export const AddToSpreadDoucmentList = (documentId) => {
  const spreadDocumentList = getSpreadDocumentFromStorage();

  if (spreadDocumentList) {
    if (!spreadDocumentList.includes(documentId)) {
      setSpreadDocumentToStorage([...spreadDocumentList, documentId]);
    }
  } else {
    setSpreadDocumentToStorage([documentId]);
  }
};
