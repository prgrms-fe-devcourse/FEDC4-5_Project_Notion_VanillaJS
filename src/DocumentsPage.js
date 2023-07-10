import { request, getDocumentId } from './api.js';
import DocumentEditComponent from './DocumentEditComponent.js';
import { updateDocumentTitle } from './router.js';

export default function DocumentsPage({ target }) {
  const page = document.createElement('div');
  page.setAttribute('class', 'page');

  const docEditComponent = new DocumentEditComponent({
    target: page,
    initialState: {
      doc: [],
    },
  });

  // 로컬 스토리지 쪽 먼저 하게 우선 감추기
  const fetchDoc = async (id) => {
    const doc = await getDocumentId(id);
    docEditComponent.setState({
      doc,
    });
  };

  this.sendId = (id) => {
    fetchDoc(id);
    this.render();
  };

  const fetchDocsList = async () => {
    const docs = await request('/');
  };

  this.render = async () => {
    await fetchDocsList();
    target.appendChild(page);
  };
  this.render();
}
