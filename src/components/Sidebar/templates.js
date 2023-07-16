import { documentSvg, trashSvg, plusSvg, chevronRightSvg } from '../../utils/svgTemplates.js';

const template = (function () {
  const documentList = ({ documents = [], openedDocuments = {}, currentDocumentId = 0, depth = 0 }) => `
    <ul class="sidebar__document-list">
      ${documents.map((document) => documentListItem({ document, openedDocuments, currentDocumentId, depth })).join('')}
    </ul>
  `;

  const emptyDocumentListItem = ({ depth }) => `
    <ul class="sidebar__document-list">
      <li class="sidebar__document-item">
        <div style="padding: 0.5em 0; padding-left: ${1 * depth}em;">
          <div class="sidebar__document--title">하위 페이지 없음</div>
        </div>
      </li>
    </ul>
  `;

  const documentListItem = ({
    document: { id, title, documents, createdAt, updateAt },
    openedDocuments = {},
    currentDocumentId = 0,
    depth = 0,
  }) => {
    const innerDocumentList =
      documents.length > 0
        ? documentList({ documents, openedDocuments, currentDocumentId, depth: depth + 1 })
        : emptyDocumentListItem({ depth: depth + 1 });

    return `
      <li class="sidebar__document-item" data-id="${id}">
        <div
          class="${
            'sidebar__document' + (currentDocumentId === id ? ' active' : '') + (openedDocuments[id] ? ' opened' : '')
          }"
          data-role="navigate"
          style="padding-left: ${1 * depth}em;"
        >
          <div class="sidebar__icon sidebar__open-button" data-role="toggle-opened">${chevronRightSvg()}</div>
          <div class="sidebar__document-svg">${documentSvg()}</div>
          <div class="sidebar__document--title">${title === '' ? '제목 없음' : title}</div>
          <section class="sidebar__document--action-section">
            <div class="sidebar__icon" data-role="remove" title="삭제">${trashSvg()}</div>
            <div class="sidebar__icon" data-role="append" title="하위 페이지 추가">${plusSvg()}</div>
          </section>
        </div>
        ${openedDocuments[id] ? innerDocumentList : ''}
      </li>
    `;
  };

  return { documentList, documentListItem };
})();

export default template;
