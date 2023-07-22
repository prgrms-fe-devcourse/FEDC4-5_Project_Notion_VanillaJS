import { VITE_USERNAME } from '../../config/apiConfig';
import request from '../../domain/request';
import { push } from '../../domain/router';
import { createDocument, deleteDocument } from '../../domain/api';
import SidebarDocumentTree from './SidebarDocumentTree';
import SidebarHeader from './SidebarHeader';
import { validateComponent } from '../../utils/validation';
const INITIAL_DOCUMENT_TITLE = '제목 없음';
export default function SidebarDocumentPage({ $target }) {
  validateComponent(new.target);

  const $sidebarDocumentPage = document.createElement('div');
  $sidebarDocumentPage.classList.add('sidebar-document');

  // 사이드바 헤더
  new SidebarHeader({
    $target: $sidebarDocumentPage,
    initialState: {
      user: VITE_USERNAME,
    },
  });

  // 사이드바 문서 트리의 초기상태, 삭제, 추가 처리
  const sidebarDocumentTree = new SidebarDocumentTree({
    $target: $sidebarDocumentPage,
    initialState: [],
    deleteDocument,
    addDocument: async (id, buttonClassName) => {
      if (buttonClassName === 'add-button') {
        const document = {
          title: INITIAL_DOCUMENT_TITLE,
          parent: id,
        };
        const newDocument = await createDocument(document);
        push(`/documents/${newDocument.id}`);
        this.render();
      }
    },
  });

  // 문서 tree 가져옴
  const updateDocumentTree = async () => {
    const data = await request('/documents');
    sidebarDocumentTree.setState(data);
  };

  // 페이지 렌더링
  this.render = async () => {
    await updateDocumentTree();
    $target.appendChild($sidebarDocumentPage);
  };

  this.render();
}
