export const getRightNextState = (prevState, nextState) => {
  const clonedState = structuredClone(prevState);

  const stack = clonedState;
  const results = [];

  while (stack.length) {
    const currentNode = stack.pop();

    if (currentNode.isSpread) {
      results.push(currentNode.id);
    }

    for (let i = 0; i < currentNode.documents.length; i++) {
      stack.push(currentNode.documents[i]);
    }
  }

  const stack2 = [...nextState];

  while (stack2.length) {
    const currentNode = stack2.pop();
    if (results.includes(currentNode.id)) {
      currentNode.isSpread = true;
    }

    const documents = [...currentNode.documents];
    for (let i = 0; i < documents.length; i++) {
      stack2.push(documents[i]);
    }
  }
  return nextState;
};

export const getIdFromElement = async (e) => {
  const {
    currentTarget: { id },
  } = e;

  return id;
};
export const movePage = (id) => history.pushState(null, null, `/${id}`);

export const debounceTimer = (timer, func, settingTime) => {
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(func, settingTime);
};
