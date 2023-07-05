/**
 *
 * @param {rootDocument} currentDocument
 * @description 현재 문서의 자식 문서
 */

export default function RecurChildDocument(rootDocument) {
  return rootDocument
    .map(
      ({ id, title, documents }) =>
        `<div class="child-document" data-id="${id}">
          ${title ?? "제목 없음"}
          ${RecurChildDocument(documents)}
        </div>`
    )
    .join("");
}
