import { deleteDocument, postDocument } from "../../../../api/document.js";
import { PATH } from "../../../../constants/path.js";
import { push } from "../../../../utils/route.js";
import DocumentItem from "../DocumentItem.js";

/**
 * @description 트리 형태로 문서를 불러오는 함수
 */

export default function RecurDocumentList({
  parentElement,
  rootDocuments,
  childRender,
  removeRender,
  depthCount,
}) {
  rootDocuments.map((rootDocument) =>
    new DocumentItem({
      parentElement,
      getChildDocument:
        rootDocument.documents.length === 0
          ? () => {}
          : (innerParentElement) =>
              RecurDocumentList({
                rootDocuments: rootDocument.documents,
                parentElement: innerParentElement,
                childRender,
                removeRender,
                depthCount: depthCount + 1,
              }),
      onClickChildButton: async (documentId) => {
        const newDocument = await postDocument({
          title: null,
          parent: documentId,
        });
        childRender(documentId, { ...newDocument, documents: [] });
        push(`${PATH.DOCUMENTS}/${newDocument.id}`);
      },
      onClickRemoveButton: async (documentId) => {
        await deleteDocument(documentId);
        removeRender(documentId);
      },
      onClickRoute: async (documentId) => {
        push(`${PATH.DOCUMENTS}/${documentId}`);
      },
      depthCount,
      ...rootDocument,
    }).render()
  );
}
