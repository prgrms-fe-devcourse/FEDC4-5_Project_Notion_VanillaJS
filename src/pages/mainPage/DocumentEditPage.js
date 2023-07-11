import { getDocument, updateDocument } from '../../domain/apiCall';
import notionStorage from '../../store/notionStorage';
import debounce from '../../domain/debounce';
import Editor from './Editor';
import MainDocumentTree from './MainDocumentTree';
import { validateComponent, validateInputData } from '../../utils/validation';

const TEMP_DATA_MESSAGE = '저장되지 않은 임시 데이터가 있습니다 불러올까요?';

export default function DocumentEditPage({ $target, initialState, renderDocumentTree }) {
  validateComponent(new.target);

  const $documentEditPage = document.createElement('div');
  $documentEditPage.classList.add('edit-document');

  validateInputData(initialState.documents);
  this.state = initialState;

  let documentLocalSaveKey = `temp-document-${this.state.documentId}`;

  const editor = new Editor({
    $target: $documentEditPage,
    initialState: {
      title: '',
      content: '',
    },
    editDocument: (document) => {
      debouncedSaveToStorage(document);
      debouncedSaveToServer(document);
    },
  });

  const mainDocumentTree = new MainDocumentTree({
    $target: $documentEditPage,
    initialState: [],
  });

  // 로컬 스토리지에 일정한 시간 간격으로 저장
  const debouncedSaveToStorage = debounce((document) => {
    notionStorage.setItemToStorage(documentLocalSaveKey, {
      ...document,
      tempSaveDate: new Date(),
    });
  }, 500);

  // 서버는 스토리지보다 더 긴 시간 간격으로 저장
  const debouncedSaveToServer = debounce(async (newDoc) => {
    await updateDocument(newDoc.id, newDoc);
    notionStorage.removeItemToStorage(documentLocalSaveKey);
    renderDocumentTree();
    const document = await getDocument(newDoc.id);
    mainDocumentTree.setState(document);
  }, 1000);

  // 상태 변경 시 문서 ID가 변경된 경우,
  // fetchDocument 함수를 호출하여 새로운 문서를 불러오기
  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      documentLocalSaveKey = `temp-document-${nextState.documentId}`;
      this.state = nextState;
      await fetchDocument();
      return;
    }

    this.state = nextState;

    this.render();

    if (this.state.document) {
      mainDocumentTree.setState(this.state.document);
      editor.setState(this.state.document);
    }
  };

  // 문서 불러오기
  const fetchDocument = async () => {
    const { documentId } = this.state;
    const document = await getDocument(documentId);
    const tempDocument = notionStorage.getItemToStorage(documentLocalSaveKey, {
      title: '',
      content: '',
    });

    if (tempDocument.tempSaveDate && tempDocument.tempSaveDate > document.updatedAt) {
      if (confirm(`${TEMP_DATA_MESSAGE}`)) {
        this.setState({
          ...this.state,
          document: tempDocument,
        });
        return;
      }
    }

    this.setState({
      ...this.state,
      document,
    });
  };

  this.render = () => {
    $target.appendChild($documentEditPage);
  };
}
