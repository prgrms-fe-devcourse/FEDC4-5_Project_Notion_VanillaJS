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

export function removeDocument(documentId, state) {
  const stack = [];
  const tempState = structuredClone(state);

  stack.push(tempState);

  while (stack.length !== 0) {
    const current = stack.pop();

    for (let i = 0; i < current.length; i++) {
      if (current[i].id === documentId) {
        current.splice(i, 1);
        return tempState;
      }
      stack.push(current[i].documents);
    }
  }
  return tempState;
}

export function editTitleDocument(documentId, state, documentTitle) {
  const stack = [];
  const tempState = structuredClone(state);

  for (const temp of tempState) {
    stack.push(temp);
  }

  while (stack.length !== 0) {
    const current = stack.pop();

    if (current.id === documentId) {
      current.title = documentTitle;
      return tempState;
    }

    for (const document of current.documents) {
      stack.push(document);
    }
  }

  return tempState;
}
