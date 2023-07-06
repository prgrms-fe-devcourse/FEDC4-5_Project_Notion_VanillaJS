import DocumentList from "./DocumentList.js";
import { request } from "./api.js";
import { push } from "./router.js";
import { getItem, setItem } from "./storage.js";

export default function DocumentsPage({ $target }) {
  const documentList = new DocumentList({
    $target,
    initialState: [],
    onAdd: async (selectedDocumentId) => {
      const result = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: selectedDocumentId,
        }),
      });

      await fetchDocumentList();

      const isClicked = getItem("isClicked", null) ?? {};

      isClicked[`${result.id}`] = true;
      setItem("isClicked", JSON.stringify(isClicked));
      push(`/documents/${result.id}`);
    },
    onContentView: async (selectedDocumentId) => {
      push(`/documents/${selectedDocumentId}`);
    },
    onRemove: async (selectedDocumentId) => {
      await request(`/documents/${selectedDocumentId}`, {
        method: "DELETE",
      });

      await fetchDocumentList();

      push("/");
    },
  });

  const fetchDocumentList = async () => {
    const documentsList = await request(`/documents`);

    documentList.setState(documentsList);
  };

  fetchDocumentList();
}
