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
  // 재귀적으로 documentlist의 item들을 연결해주는 과정
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

  // spreadDocumentList에 현재 documentId가 존재한다면 display: flex, 없다면 display: none으로 설정
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
    // 자식들이 있을 때,
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

// 특정 documentId가 SpreadDocumentList에 존재한다면 list에서 삭제, 존재하지 않으면 추가
export const toggleToSpreadDoucmentList = (documentId) => {
  const spreadDocumentList = getSpreadDocumentFromStorage();

  if (spreadDocumentList && spreadDocumentList.includes(documentId)) {
    // list가 있고, list 안에 id가 있다면 => list에서 제거
    const newList = spreadDocumentList.filter(
      (spreadId) => spreadId !== documentId
    );
    setSpreadDocumentToStorage(newList);
  } else {
    // list 안에 id가 없다면 => 기존 list에 현재 documentId 추가
    if (spreadDocumentList) {
      setSpreadDocumentToStorage([...spreadDocumentList, documentId]);
    } else {
      // list가 아예 없거나 비어있다면(null) => 현재 documentId 추가
      setSpreadDocumentToStorage([documentId]);
    }
  }
};
