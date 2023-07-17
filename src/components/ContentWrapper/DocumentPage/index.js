import TextEditor from '@components/ContentWrapper/DocumentPage/TextEditor';
import request from '@api';
import './style.css';

export default function DocumentPage({ $target, initialState, updateState }) {
  const $documentPage = document.createElement('div');
  $documentPage.className = 'DocumentPage';
  $target.appendChild($documentPage);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const $progressBar = document.querySelector('.ProgressBar');

  let timer = null;

  const textEditor = new TextEditor({
    $target: $documentPage,
    initialState: this.state,
    onEditing: (id, document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      $progressBar.style.opacity = '1';
      $progressBar.style.width = '0%';

      timer = setTimeout(async () => {
        try {
          const createdDocument = await request(`/documents/${id}`, {
            method: 'PUT',
            body: JSON.stringify(document),
          });

          $progressBar.style.width = '100%';

          if (createdDocument && createdDocument.id) {
            textEditor.setState({ isDocumentSaved: true, ...createdDocument });
            updateState({ isDocumentSaved: true, ...createdDocument });
          } else {
            console.error('백엔드 이슈: res 또는 res.id가 없습니다.');
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
        } finally {
          $progressBar.style.opacity = '0';
          $progressBar.style.width = '0%';
        }
      }, 1000);
    },
  });

  this.render = () => {
    const { documentId, isDocumentSaved } = this.state;

    if (!documentId && !isDocumentSaved) {
      $documentPage.style.visibility = 'hidden';
    } else {
      $documentPage.style.visibility = 'visible';
    }
    textEditor.setState(this.state);
  };
}
