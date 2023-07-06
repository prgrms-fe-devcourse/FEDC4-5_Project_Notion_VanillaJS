export const createRouter = (component) => async ({ url }) => {
  if (component.editor.state.id !== -1) {
    const { title, content } = component.editor.state;
    component.saveDocumentToServer({ title, content });
  }
  history.pushState(null, null, url);
  const urlSplit = url.split("/");
  const [routeName, documentId] = urlSplit.slice(
    urlSplit.length - 2,
    urlSplit.length
  );
  switch (routeName) {
    case "documents":
      const savedDocument = new Document(await component.getDocument(documentId));
      try {
        const { title, content, tmpSaveDate } = getItem(
          "documents/" + documentId
        );
        if (tmpSaveDate > savedDocument.updatedAt) {
          if (confirm("임시저장된 데이터가 있습니다. 불러오시겠습니까?")) {
            component.editor.state = savedDocument.cloneNewDocument({
              title,
              content,
              updatedAt: tmpSaveDate,
            });
            return;
          }
        }
      } catch (error) {
        console.log(
          "임시저장된 데이터가 없습니다. 서버에서 데이터를 불러옵니다."
        );
      }
      component.editor.state = savedDocument;
      removeItem("documents/" + documentId);
      break;
  }
};
