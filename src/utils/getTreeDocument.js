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
      ...rootDocument,
    }).render()
  );
};
