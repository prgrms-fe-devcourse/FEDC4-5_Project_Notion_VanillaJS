import validateComponent from '../../utils/validateComponent';

export default function DocumentTree({ targetElement, childDocuments, invisibleTreeSet, foldedTreeSet }) {
  validateComponent(this, DocumentTree);
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.render = () => {
    targetElement.innerHTML += `
      ${childDocuments
        .map(({ id, title }) => {
          return `
            <div class="document-tree ${invisibleTreeSet.has(id) ? 'invisible-tree' : ''}" data-id="${id}">
              <div class="document-blob">
                <div class="document-blob-left">
                  <span class="document-toggle document-blob-btn">
                    ${
                      foldedTreeSet.has(id)
                        ? '<span class="material-symbols-outlined">chevron_right</span>'
                        : '<span class="material-symbols-outlined">expand_more</span>'
                    }
                  </span>
                  <span class="document-blob-title">${title === '' ? '제목없음' : title}</span>
                </div>
                <div class="document-blob-right">
                  <span class="delete-document-btn document-blob-btn">
                    <span class="material-symbols-outlined">delete</span>
                  </span>
                  <span class="new-document-btn document-blob-btn">
                    <span class="material-symbols-outlined">add</span>
                  </span>
                </div>
              </div>
            </div>
          `;
        })
        .join('')}
    `;

    childDocuments.forEach(({ id, documents }) => {
      new DocumentTree({
        targetElement: targetElement.querySelector(`[data-id="${id}"]`),
        childDocuments: documents,
        invisibleTreeSet,
        foldedTreeSet,
      });
    });
  };

  this.init();
}
