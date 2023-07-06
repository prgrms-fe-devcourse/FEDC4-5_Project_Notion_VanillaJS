import { editDocumentMessages } from '../../constants';
import { validateComponent, validateString } from '../../utils/validation';

export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  editDocument,
}) {
  validateComponent(new.target);

  const $editor = document.createElement('div');
  $editor.classList.add('editor');
  $target.appendChild($editor);

  validateString(initialState);
  this.state = initialState;

  // 초기 상태에서 메시지가 표시되고, 클릭 시 해당 메시지가 사라지도록 처리
  const handleTitleInputClick = (e) => {
    if (e.target.value === `${editDocumentMessages.INITIAL_DOCUMENT_TITLE}`) {
      e.target.value = '';
      e.target.removeEventListener('click', handleTitleInputClick);
    }
  };
  // 전역 범위에 함수 정의
  window.handleTitleInputClick = handleTitleInputClick;

  this.setState = (nextState) => {
    this.state = nextState;
    const { title, content } = this.state;
    $editor.querySelector('[name=title]').value = title;
    $editor.querySelector('[name=content]').value = content;
  };

  this.render = () => {
    const { title, content } = this.state;
    const titleValue = title === `${editDocumentMessages.INITIAL_DOCUMENT_TITLE}` ? '' : title;
    $editor.innerHTML = `
      <input class="editor-title" type="text" name="title" placeholder='${editDocumentMessages.DOCUMENT_TITLE_PLACEHOLDER}' value="${titleValue}" onclick="handleTitleInputClick(event)">
      <textarea class="editor-content" name="content" placeholder='${editDocumentMessages.DOCUMENT_CONTENT_PLACEHOLDER}'>${content}</textarea>
    `;
  };

  this.render();

  $editor.querySelector('[name=title]').addEventListener('click', handleTitleInputClick);
  $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = { ...this.state, title: e.target.value };
    this.setState(nextState);
    editDocument(this.state);
  });

  $editor.querySelector('[name=content]').addEventListener('input', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.value,
    };
    this.setState(nextState);
    editDocument(this.state);
  });
}
