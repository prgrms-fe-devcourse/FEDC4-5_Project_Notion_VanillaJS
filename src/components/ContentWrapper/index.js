import DocumentPage from '@components/ContentWrapper/DocumentPage';
import DirectoryPage from '@components/ContentWrapper/DirectoryPage';
import './style.css';

export default function ContentWrapper({ $target, initialState }) {
  const $contentWrapper = document.createElement('section');
  $contentWrapper.className = 'ContentWrapper';
  this.state = initialState;

  const updateState = (nextState) => {
    this.setState(nextState);
  };

  $target.appendChild($contentWrapper);

  const directoryPage = new DirectoryPage({ $target: $contentWrapper, initialState: this.state });
  const documentPage = new DocumentPage({
    $target: $contentWrapper,
    initialState: this.state,
    updateState,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    directoryPage.setState();
    documentPage.setState(this.state);
  };
}
