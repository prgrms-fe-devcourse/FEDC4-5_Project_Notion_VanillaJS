import { generateNestedDocumentsHTML } from '../../utils/Document/extractDocument.js';
// 전체 문서 목록을 보여주는 컴포넌트
// 각각의 이벤트는 와부애서 주입하게 설정
import DocumentItemTemplate from '../Template/DocumentItemTemplate.js';

export default function DocumentList({
  $target,
  initialState,
  onDocumentClick,
  onDocumentAdd,
  onDocumentDelete,
}) {
  const $documentLists = document.createElement('div');
  $documentLists.className = 'documentList';
  $target.appendChild($documentLists);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.setEvent = () => {
    $documentLists.addEventListener('click', (e) => {
      const $documentItem = e.target.closest('.document');
      if ($documentItem) {
        const { id } = $documentItem.dataset;
        onDocumentClick(id);
      }

      const $documentDeleteBtn = e.target.closest('.documentDeleteBtn');
      if ($documentDeleteBtn) {
        const { id } = $documentDeleteBtn.dataset;
        onDocumentDelete(id);
      }

      const $documentAddBtn = e.target.closest('.documentAddBtn');
      if ($documentAddBtn) {
        const { id } = $documentAddBtn.dataset;
        onDocumentAdd(id);
      }
    });
  };

  this.render = () => {
    $documentLists.innerHTML = `
          ${this.state
            .map(({ id, title, documents }) => {
              let html = '<ul class = "documentItemWrapper">';
              html += DocumentItemTemplate({
                documentId: id,
                documentTitle: title,
              });
              html += generateNestedDocumentsHTML(documents);
              html += '</ul>';
              return html;
            })
            .join('')}
      `;
  };

  this.setEvent();
}
