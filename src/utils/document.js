export function addChildDocument(parentId, state, newDocument) {
  const stack = [];
  const tempState = structuredClone(state);

  for (const temp of tempState) {
    stack.push(temp);
  }

  while (stack.length !== 0) {
    const current = stack.pop();
    if (current.id === parentId) {
      current.documents.push(newDocument);
      return tempState;
    }

    for (const document of current.documents) {
      stack.push(document);
    }
  }

  return tempState;
}
