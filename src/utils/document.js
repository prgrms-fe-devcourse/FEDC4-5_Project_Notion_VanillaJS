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
        const temp = current.splice(i, 1);
        if (temp[0].documents.length !== 0) {
          tempState.push(...temp[0].documents);
          tempState.sort((a, b) => a.id - b.id);
        }

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

export function insertAllDocument(state, insert) {
  const stack = [];
  const tempState = structuredClone(state);

  for (const temp of tempState) {
    stack.push(temp);
  }

  while (stack.length !== 0) {
    const current = stack.pop();

    insert(current.title ?? "", current.id);

    for (const document of current.documents) {
      stack.push(document);
    }
  }
}

export function findChildDocuments(state, documentId) {
  const stack = [];
  const tempState = structuredClone(state);

  for (const temp of tempState) {
    stack.push(temp);
  }

  while (stack.length !== 0) {
    const current = stack.pop();

    if (current.id === documentId) {
      return current.documents;
    }

    for (const document of current.documents) {
      stack.push(document);
    }
  }

  return [];
}

function Node(value = "") {
  this.value = value;
  this.children = new Map();
  this.isWord = false;
  this.list = [];
}

export function TrieDocument() {
  this.root = new Node();

  this.insert = (string, id) => {
    let currentNode = this.root;

    for (const char of string) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new Node(currentNode.value + char));
      }
      currentNode = currentNode.children.get(char);
    }

    currentNode.isWord = true;
    currentNode.list.push({ title: string, id });
  };

  this.search = (value) => {
    const queue = [];
    const searchList = [];
    let index = 0;
    let currentNode = this.root;

    for (const char of value) {
      if (!currentNode.children.has(char)) {
        return [];
      }

      currentNode = currentNode.children.get(char);
    }

    queue.push(currentNode);

    while (index < queue.length) {
      const currentNode = queue[index];
      index += 1;

      if (currentNode.isWord) {
        for (const item of currentNode.list) {
          searchList.push(item);
        }
      }

      for (const [key, child] of currentNode.children) {
        queue.push(child);
      }
    }

    return searchList;
  };

  this.reset = () => {
    this.root = new Node();
  };
}
