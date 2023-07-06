import DocumentList from './DocumentList.js';
import DocumentListTitle from './DocumentListTitle.js';
import Button from '../Button/Button.js';

export default function DocumentListSection({
  $parent,
  initialState,
  onClickTitle,
  onClickRootAdd,
  onClickDocument,
  onClickAdd,
  onClickDelete,
}) {
  const $listSection = document.createElement('div');
  $listSection.classList.add('documentList-section');

  $parent.appendChild($listSection);

  this.state = initialState;

  new DocumentListTitle({
    $parent: $listSection,
    onClickTitle,
  });

  const documentList = new DocumentList({
    $parent: $listSection,
    initialState: this.state,
    onClickDocument,
    onClickAdd,
    onClickDelete,
  });

  new Button({
    $parent: $listSection,
    className: 'documentList-newRoot-button',
    text: '+ 페이지 추가',
    onClick: onClickRootAdd,
  });

  this.setState = nextState => {
    this.state = nextState;
    documentList.setState({
      ...this.state,
    });
  };
}
