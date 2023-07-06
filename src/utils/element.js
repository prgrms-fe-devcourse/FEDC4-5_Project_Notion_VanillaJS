export const findDeepestChild = ($node) => {
  let currentNode = $node;

  while (currentNode) {
    const nextNode = currentNode.firstChild;
    if (!nextNode) break;
    currentNode = nextNode;
  }

  return currentNode;
};

export const isHeading = ($node) =>
  $node.classList.contains('editor__h1') ||
  $node.classList.contains('editor__h2') ||
  $node.classList.contains('editor__h3');

export const removeHeading = ($node) => {
  $node.classList.remove('editor__h1');
  $node.classList.remove('editor__h2');
  $node.classList.remove('editor__h3');
};
