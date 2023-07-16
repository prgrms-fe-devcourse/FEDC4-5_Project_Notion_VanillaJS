import DocumentList from "../components/DocumentList.js";
import { request } from "../util/api.js";
import { push } from "../util/router.js";
import { getItem, setItem, storageKey } from "../util/storage.js";

export default function DocumentsPage({ $target }) {
  this.state = {
    selectedDocument: "",
  };

  this.setState = (newState) => {
    this.state = newState;
    documentList.setState({
      ...documentList.state,
      selectedDocument: this.state.selectedDocument,
    });
  };

  const fetchDocumentList = async () => {
    const documentsList = await request(`/documents`);

    documentList.setState({ ...documentList.state, documentsList });
  };

  const onAdd = async (selectedDocumentId) => {
    const result = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음",
        parent: selectedDocumentId,
      }),
    });

    const isClicked = getItem(storageKey, null) ?? {};

    isClicked[`${result.id}`] = true;
    setItem(storageKey, JSON.stringify(isClicked));
    push(`/documents/${result.id}`);

    await fetchDocumentList();
  };

  const onContentView = async (selectedDocumentId) => {
    push(`/documents/${selectedDocumentId}`);
  };

  const onRemove = async (selectedDocumentId) => {
    await request(`/documents/${selectedDocumentId}`, {
      method: "DELETE",
    });

    await fetchDocumentList();

    push("/");
  };

  const documentList = new DocumentList({
    $target,
    initialState: {
      selectedDocument: "",
      documentsList: [],
    },
    onAdd,
    onContentView,
    onRemove,
  });

  fetchDocumentList();
}
