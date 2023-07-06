import { push } from './router.js';
import { createNewDocument, getAllDocuments, deleteDocument } from './api.js';

export default function DocumentList({
  target,
  initialState,
  onDocumentClick,
}) {
  const createNewDocBtn = document.createElement('button');
  createNewDocBtn.textContent = '새 문서 생성';
  createNewDocBtn.className = 'createNewRootDocBtn';

  const documentList = document.createElement('div');

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const listItem = (doc) => {
    return `
    <div style="display:flex">
      <div data-id="${doc.id}">${doc.title} ${doc.id}</div>
      <button data-id="${doc.id}" class="deleteBtn">delete</button>
      <button data-id="${doc.id}" class="addBtn">add</button>
    </div>

    <div id="childList" style="padding-left: 16px;">
      ${
        doc.documents &&
        doc.documents
          .map((childDoc) => {
            return listItem(childDoc);
          })
          .join('')
      }
    </div>
    `;
  };

  this.render = () => {
    target.appendChild(documentList);
    documentList.innerHTML = `
      ${createNewDocBtn.outerHTML}
      <div>
        ${this.state.map((doc) => listItem(doc)).join('')}
      </div>
    `;
  };

  // 버튼 event
  documentList.addEventListener('click', async (e) => {
    const clickedElement = e.target;
    if (clickedElement.className === 'addBtn' && clickedElement) {
      const { id } = clickedElement.dataset;
      await createNewDocument(id);
      const undatedAllDocuments = await getAllDocuments();
      // console.log(undatedAllDocuments);
      this.setState(undatedAllDocuments);
      // push(`${id}`);
    } else if (clickedElement.className === 'deleteBtn') {
      // 삭제
      const { id } = clickedElement.dataset;
      await deleteDocument(id);
      const updatedAllDocuments = await getAllDocuments();
      this.setState(updatedAllDocuments);
    } else if (clickedElement.className === 'createNewRootDocBtn') {
      await createNewDocument();
      const updatedAllDocuments = await getAllDocuments();
      this.setState(updatedAllDocuments);
    } else {
      // list 항목 클릭시 history 이용 페이지 이동
      const { id } = clickedElement.dataset;
      console.log(id);
      push(`/documents/${id}`);
    }
  });

  //this.render();
}
