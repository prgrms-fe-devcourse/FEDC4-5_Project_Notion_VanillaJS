import { deleteDocument, postDocument } from "../api/document.js";
import DocumentItem from "../components/domain/DocumentItem.js";
/**
 *
 * @param {rootDocument} listData
 * @param {parentElement} listElement
 * @description 트리 형태로 문서를 불러오는 함수
 */
export const getTreeDocument = (rootDocuments, parentElement) => {
  rootDocuments.map((rootDocument) =>
    new DocumentItem({
      parentElement,
      getChildDocument:
        rootDocument.documents.length === 0
          ? () => {}
          : (innerParentElement) =>
              getTreeDocument(rootDocument.documents, innerParentElement),
      onClickChildButton: async (documentId) =>
        await postDocument({ title: null, parent: documentId }),
      onClickRemoveButton: async (documentId) =>
        await deleteDocument(documentId),
      ...rootDocument,
    }).render()
  );
};
