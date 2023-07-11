import Component from '../core/Component';
import DocumentItem from './DocumentItem';
import { request } from '../api/DocumentAPI';

export default class Document extends Component {
  constructor() {
    super();
    request('').then((value) => {
      this.setState({ ...value });
    });
  }

  render() {
    this.el.innerHTML = `
        <div class="container">
            <button class="add-document">+ 페이지 추가</button>
        </div>
        `;
    this.el.setAttribute('id', 'document-app');
    this.el.setAttribute('style', 'background-color: rgb(251,251,250)');

    const addDocumentBtn = this.el.querySelector('.add-document');
    const documentContainer = this.el.querySelector('.container');

    const renderDocuments = (container, document) => {
      for (const key in document) {
        const { id, title, documents } = document[key];
        const parentDocument = new DocumentItem();
        parentDocument.setState({ id, title, isFolded: true });
        container.appendChild(parentDocument.el);
        if (container.getAttribute('class') !== 'container') {
          parentDocument.el.setAttribute('style', 'display: none');
          parentDocument.el.setAttribute('class', 'child');
        }
        if (documents.length !== 0) {
          renderDocuments(parentDocument.el, documents);
        }
      }
    };

    renderDocuments(documentContainer, this.state);

    addDocumentBtn.addEventListener('click', () => {
      const res = request('', {
        method: 'POST',
        body: JSON.stringify({
          title: '제목 없음',
          parent: null,
        }),
      });
      const documentItem = new DocumentItem();
      res.then((value) => {
        documentItem.setState({ id: value.id, title: value.title });
      });
      docuContainer.append(documentItem.el);
    });
  }
}
