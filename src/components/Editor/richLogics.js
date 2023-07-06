import { setCaret } from '../../utils/cursor.js';
import { findDeepestChild, isHeading, removeHeading } from '../../utils/element.js';

const selection = window.getSelection();

/**
 * 에디터 요소에 입력한 키를 기반으로 리치 컨텐츠를 적용합니다.
 * @param {Node} $editor 에디터 요소
 * @param {string} key 이벤트로 입력된 키
 */
export const applyRichContent = ({ $editor, key }) => {
  const $parentNode = selection.anchorNode.parentNode;
  const $line = $parentNode.closest('.editor__line');
  const $anchorNode = selection.anchorNode;
  const text = $anchorNode.textContent;

  const isFirstLine = $parentNode === $editor && $anchorNode.nodeType === Node.TEXT_NODE;
  const isEmpty = $editor.innerHTML === '<br>';
  const isHeadingCommand = key === ' ' && $line;

  // 첫 번째 줄에서 텍스트를 입력한 경우 div 요소로 감싸줌
  if (isFirstLine) {
    $parentNode.innerHTML = `<div class="editor__line">${text}</div>`;
    setCaret($parentNode.firstChild, 1);
  }

  // 에디터가 비어있으면 내용 초기화
  if (isEmpty) {
    $editor.innerHTML = '';
  }

  // 헤딩 속성 지정
  if (isHeadingCommand) {
    const updateHtml = (level) => {
      const nextHtml = $line.innerHTML.replace('#'.repeat(level) + ' ', '') || '<br>';
      removeHeading($line);

      $line.classList.add(`editor__h${level}`);
      $line.innerHTML = nextHtml;
      [...$line.childNodes]
        .filter((node) => node.nodeType === Node.ELEMENT_NODE)
        .forEach((node) => (node.style.fontSize = ''));

      setCaret(findDeepestChild($line), 0);
    };

    if (text.startsWith('### ')) updateHtml(3);
    else if (text.startsWith('## ')) updateHtml(2);
    else if (text.startsWith('# ')) updateHtml(1);
  }
};

export const applyEnter = (event, { $editor }) => {
  const $parentNode = selection.anchorNode.parentNode;
  const $anchorNode = selection.anchorNode;
  const $line = $parentNode.closest('.editor__line');

  const isEmpty = $anchorNode === $editor;
  const isAtTextStart = selection.anchorOffset === 0;

  // 비어있는 상태에서 개행하는 경우
  if (isEmpty) {
    event.preventDefault();
    $anchorNode.innerHTML = `<div class="editor__line"><br/></div><div class="editor__line"><br/></div>`;
    setCaret($anchorNode.lastChild, 0);
    return;
  }

  if (!$line) return;

  // headings 태그에서 개행하는 경우
  // 첫 텍스트에서 개행하면: 기본 이벤트 막고 이전 라인에 div 요소 추가
  // 첫 텍스트 이후에서 개행하면: 다음 라인에 자동으로 생성되는 div 요소에서 헤딩 속성 제거
  if (isHeading($line)) {
    if (isAtTextStart) {
      event.preventDefault();
      const $newLine = document.createElement('div');
      $newLine.className = 'editor__line';
      $editor.insertBefore($newLine, $line);
    } else {
      setTimeout(() => {
        const $deepChild = findDeepestChild($line.nextSibling);
        if ($deepChild && $line.nextSibling) removeHeading($line.nextSibling);
      }, 0);
    }
  }

  // 개행 시 앞 뒤 라인의 텍스트가 비어있으면 모든 스타일 리셋
  setTimeout(() => {
    const resetStyle = ($targetLine) => {
      const $child = findDeepestChild($targetLine);
      if ($child && $child.nodeType !== Node.TEXT_NODE) $targetLine.innerHTML = '<br>';
    };

    resetStyle($line.previousSibling);
    resetStyle($line.nextSibling);
  }, 0);
};

export const applyBackspace = (event) => {
  const $parentNode = selection.anchorNode.parentNode;
  const $line = $parentNode.closest('.editor__line');
  const $previousLine = $line?.previousSibling;
  const $heading = $parentNode.closest('.editor__h1, .editor__h2, .editor__h3');

  const isAtFirstTextInHeading = $heading && selection.anchorOffset === 0;
  const isPreviousLineIsHeading = $previousLine && isHeading($previousLine) && selection.anchorOffset === 0;

  // headings 태그의 시작 위치에서 백스페이스를 누른 경우 헤딩 속성 삭제
  if (isAtFirstTextInHeading) {
    event.preventDefault();
    removeHeading($heading);
  }

  // 지우려는 라인의 이전 라인이 headings 태그인 경우 현재 라인에 들어가게 되는 fontSize 속성 삭제
  if (isPreviousLineIsHeading) {
    setTimeout(() => {
      [...$previousLine.childNodes]
        .filter((node) => node.nodeType === Node.ELEMENT_NODE)
        .forEach((node) => (node.style.fontSize = ''));
    }, 0);
  }
};
