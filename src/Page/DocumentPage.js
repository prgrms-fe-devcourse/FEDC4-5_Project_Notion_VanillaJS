import {
  getDocuments,
  deleteDocument,
  addNewDocument,
} from '../api/Document/index.js';
import DocumentAddButton from '../Component/Documents/DocumentAddBtn.js';
import DocumentList from '../Component/Documents/DocumentList.js';
import { customPush } from '../route.js';
import { PAGE_CHANGE_TYPE } from '../constants/route.js';

export default function DocumentPage({ $target }) {
  const { PUSH, REPLACE } = PAGE_CHANGE_TYPE;
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
      customPush(`/documents/${id}`, PUSH);
    },

    onDocumentAdd: async (id) => {
      addNewDocument(id)
        .then(({ id: newDocumentId }) => {
          customPush(`/documents/${newDocumentId}`, PUSH);
        })
        .catch((e) => {
          alert(e);
        });
    },

    onDocumentDelete: async (id) => {
      deleteDocument(id)
        .then(({ parent }) => {
          if (parent.id) {
            customPush(`/documents/${parent.id}`, REPLACE);
          }
        })
        .catch(() => {
          customPush('/', PUSH);
        });
    },
  });

  const documentAddBtn = new DocumentAddButton({
    $target: $page,
    initalState: '문서 추가하기',
    onDocumentAdd: () => {
      addNewDocument(null).then(({ id }) => {
        customPush(`/documents/${id}`, PUSH);
        this.render();
      });
    },
  });
}
