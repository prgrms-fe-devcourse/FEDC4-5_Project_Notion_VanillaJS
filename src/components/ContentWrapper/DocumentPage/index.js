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

          textEditor.setState({ status: 'saved', ...createdDocument });
          updateState({ status: 'saved', ...createdDocument });

          await new Promise((resolve) => setTimeout(resolve, 2000));
        } finally {
          $progressBar.style.opacity = '0';
          $progressBar.style.width = '0%';
        }
      }, 1000);
    },
  });

  this.render = () => {
    const { documentId, status } = this.state;

    if (!documentId && !status) {
      $documentPage.style.visibility = 'hidden';
    } else {
      $documentPage.style.visibility = 'visible';
    }
    textEditor.setState(this.state);
  };
}
