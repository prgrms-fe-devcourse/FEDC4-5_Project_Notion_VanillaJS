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

// export const createDocumentElement = (document) => {
//   //
//   const documentItemString = `
//   <div class="documentItem" id=${document.id}>
//     <div class="documentContent">
// <button class="spreadButton">🔻</button>
// <span class="documentTitle">${document.title}</span>
// <button class="addChildDocumentButton">+</button>
// <button class="deleteDocumentButton">-</button>
//     </div>

//     <div class="childDocumentList">
//     ${document.documents ? document.documents
//       .map((document) => {
//         createDocumentElement(document);
//       })
//       .join("") : ""}
//     </div>
//   </div>
//   `;
//   return documentItemString;
// };

export const createDocumentElement = (document) => {
  // 재귀적으로 documentlist의 item들을 연결해주는
  const documentItem = createDomElementWithClass("div", "documentItem");
  documentItem.id = document.id;

  const documentContent = createDomElementWithClass("div", "documentContent");
  documentItem.appendChild(documentContent);
  documentContent.innerHTML = `
      <button class="spreadButton">⬇️</button>
      <span class="documentTitle">${document.title}</span>
      <button class="addChildDocumentButton">+</button>
      <button class="deleteDocumentButton">-</button>
  `;

  const childDocumentList = createDomElementWithClass(
    "div",
    "childDocumentList"
  );
  documentItem.appendChild(childDocumentList);

  if (document.documents) {
    document.documents.forEach((document) => {
      childDocumentList.appendChild(createDocumentElement(document));
    });
  }

  return documentItem;
};

export const toggleDisplay = (element) => {
  if (element) {
    console.log(`변경 전: ${element.style.display}`);
    element.style.display === "none"
      ? (element.style.display = "flex")
      : (element.style.display = "none");
    console.log(`변경 후: ${element.style.display}`);
  }
};

export const toggleSpreadIcon = (element) => {
  if (element) {
    element.innerHTML === "➡️"
      ? (element.innerHTML = "⬇️")
      : (element.innerHTML = "➡️");
  }
};
