import {
  getDocuments,
  deleteDocument,
  addNewDocument,
} from '../api/Document/index.js';
import DocumentAddButton from '../Component/Documents/DocumentAddBtn.js';
import DocumentList from '../Component/Documents/DocumentList.js';
import { push } from '../route.js';

export default function DocumentPage({ $target }) {
  const $page = document.createElement('div');
  $page.classList.add('documentPage');

  this.render = async () => {
    await getDocuments()
      .then((documents) => documentLists.setState(documents))
      .catch((e) => alert(e));
    $target.appendChild($page);

    documentAddBtn.render();
  };

  const documentLists = new DocumentList({
    $target: $page,
    initalState: [],
    onDocumentClick: (id) => {
      push(`/documents/${id}`);
    },

    onDocumentAdd: async (id) => {
      addNewDocument(id)
        .then(({ id: newDocumentId }) => push(`/documents/${newDocumentId}`))
        .catch((e) => {
          alert(e);
        });
    },

    onDocumentDelete: async (id) => {
      deleteDocument(id)
        .then(({ parent }) => {
          if (parent.id) {
            push(`/documents/${parent.id}`);
          }
        })
        .catch((e) => {
          push('/');
        });
    },
  });

  const documentAddBtn = new DocumentAddButton({
    $target: $page,
    initalState: '문서 추가하기',
    onDocumentAdd: () => {
      addNewDocument(null).then(({ id }) => {
        push(`/documents/${id}`);
      });
    },
  });
}
