import DocumentList from './DocumentList.js';
import DocumentListTitle from './DocumentListTitle.js';
import { getAllDocuments } from '../../api/api.js';

export default function DocumentListSection({ $parent }) {
  const $listSection = document.createElement('div');
  $listSection.classList.add('sidebar');

  new DocumentListTitle({
    $parent: $listSection,
  });
  // document 목록들을 그리는 컴포넌트
  const documentList = new DocumentList({
    $parent: $listSection,
    initialState: [],
  });

  this.setState = async () => {
    // 전체 데이터 받아오기
    const documents = await getAllDocuments();
    console.log(documents);
    documentList.setState(documents);
    this.render();
  };

  this.render = async () => {
    $parent.appendChild($listSection);
  };
}
