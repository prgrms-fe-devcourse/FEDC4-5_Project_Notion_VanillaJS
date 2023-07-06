export const validateListState = (nextState) => {
  if (!Array.isArray(nextState)) throw new Error("listState가 배열이 아닙니다.");
  if (nextState.length > 0) {
    if (!nextState.every((doc) => doc.hasOwnProperty("id") && doc.hasOwnProperty("title") && doc.hasOwnProperty("documents")))
      throw new Error("listState가 적절한 형태가 아닙니다. ");
    for (const doc of nextState) {
      validateListState(doc.documents);
    }
  }
};

export const validateEditorState = (nextState) => {
  if (!typeof nextState === "object") throw new Error("editorState가 object가 아닙니다. ");
  if (!(nextState.hasOwnProperty("title") && nextState.hasOwnProperty("content"))) throw new Error("editorState가 적절한 형태가 아닙니다.");
};
