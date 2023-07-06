import { getItem } from "./storage.js";

export const displayDocumentList = (documents) => {
  return `<ul>
          ${documents
            .map((document) => {
              const listToggleState = `isOpened-${document.id}`;
              const display = getItem(listToggleState) || "none";
              return `
                  <li data-id = "${document.id}" name = "list">
                  ${
                    !listToggleState
                      ? `
                      <span class="list-title">
                        <button class="toggle-btn" isClosed="false">
                          ▼
                        </button>
                        ${document.title}
                      </span>`
                      : `
                      <span class="list-title">
                        <button class="toggle-btn" isClosed="true">
                          ▶
                        </button>
                        ${document.title}
                      </span>`
                  }
                  <span class ="list-btn-box"><button name = "add-btn" data-id ="${
                    document.id
                  }"><i class="far fa-plus-square"></i></button>
                  <button name = "remove-btn" data-id ="${
                    document.id
                  }"><i class="far fa-minus-square"></i></button></span>
                  ${
                    document.documents.length
                      ? `<ul style="display: ${display}">${displayDocumentList(
                          document.documents
                        )}</ul>`
                      : `<ul style="display: ${display}"><li><span class="no-page">하위 페이지가 없습니다</span></li></ul>`
                  }
                  </li>
                  `;
            })
            .join("")}</ul>`;
};
