import DocumentList from './DocumentList.js';
import DocumentListTitle from './DocumentListTitle.js';

export default function DocumentListSection({ $parent }) {
  const $listSection = document.createElement('div');
  $listSection.classList.add('sidebar');
  $parent.appendChild($listSection);

  new DocumentListTitle({
    $parent: $listSection,
  });
  // document 목록들을 그리는 컴포넌트
  new DocumentList({
    $parent: $listSection,
    initialState: [],
  });
}
