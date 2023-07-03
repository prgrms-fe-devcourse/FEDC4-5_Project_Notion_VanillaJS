import { deleteDocument, postDocument } from "../../api/document.js";
import { PATH } from "../../constants/path.js";
import { push } from "../../utils/route.js";
import DocumentItem from "../domain/DocumentItem.js";
/**
 *
 * @param {rootDocument} listData
 * @param {parentElement} listElement
 * @description 트리 형태로 문서를 불러오는 함수
 */
export default function RecurDocumentList(
  rootDocuments,
  parentElement,
  render
) {
  rootDocuments.map((rootDocument) =>
    new DocumentItem({
      parentElement,
      getChildDocument:
        rootDocument.documents.length === 0
          ? () => {}
          : (innerParentElement) =>
              RecurDocumentList(
                rootDocument.documents,
                innerParentElement,
                render
              ),
      onClickChildButton: async (documentId) => {
        const newDocument = await postDocument({
          title: null,
          parent: documentId,
        });
        push(`${PATH.DOCUMENTS}/${newDocument.id}`);
        render();
      },
      onClickRemoveButton: async (documentId) => {
        await deleteDocument(documentId);
        render();
      },
      ...rootDocument,
    }).render()
  );
}
