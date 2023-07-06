export default function DocumentList({
  $parent,
  initialState,
  onClickAdd,
  onClickDelete,
  onClickDocument,
}) {
  const $documentsList = document.createElement('div');
  $documentsList.classList.add('documentList-list');
  $parent.appendChild($documentsList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const createDocumentTree = documentData => {
    return documentData
      .map(
        ({ id, title, documents }) =>
          `<li data-id=${id} class="document">
            <div class='document-content'>
              <div style="display:flex; height:20px">
                <button class="unfold-button">▶</button>
                <img alt="문서 아이콘" src='/src/assets/icons8-document-48.png'/>
                <p>${title}</p>
              </div>
              <div class="document-buttons">
                <button class="newSubDoc-button">+</button>
                <button class="delete-button">-</button>
              </div>
            </div>
            <ul>
						${documents.length > 0 ? createDocumentTree(documents) : ''}
					  </ul>
          </li>
      
        `,
      )
      .join('');
  };

  this.render = () => {
    $documentsList.innerHTML = createDocumentTree(this.state.documents);
  };

  this.render();

  $documentsList.addEventListener('click', onClickAdd);
  $documentsList.addEventListener('click', onClickDelete);
  $documentsList.addEventListener('click', onClickDocument);
}
