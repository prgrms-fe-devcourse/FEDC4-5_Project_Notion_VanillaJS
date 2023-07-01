import DocumentItem from "../components/domain/DocumentItem.js";

export const getTreeDocument = (rootDocuments, parentElement) => {
  rootDocuments.map((rootDocument) =>
    new DocumentItem({
      parentElement,
      getChildDocument:
        rootDocument.documents.length === 0
          ? () => {}
          : (parent) => getTreeDocument(rootDocument.documents, parent),
      ...rootDocument,
    }).render()
  );
};
