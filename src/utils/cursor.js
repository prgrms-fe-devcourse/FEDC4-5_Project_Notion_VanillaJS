const selection = window.getSelection();

/**
 * 키보드 커서의 위치를 $textNode의 offset 위치로 설정합니다.
 * @param {Node} $textNode 텍스트 노드
 * @param {number} offset 설정할 커서 위치
 */
export const setCaret = ($textNode, offset) => {
  const range = document.createRange();
  range.setStart($textNode, offset);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
};
