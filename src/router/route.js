export const route = async ({ url }) => {
  console.log(this);
  if (this.editor.state.id !== -1) {
    const { title, content } = this.editor.state;
    this.saveDocumentToServer({ title, content });
  }
  history.pushState(null, null, url);
  const urlSplit = url.split("/");
  const [routeName, documentId] = urlSplit.slice(
    urlSplit.length - 2,
    urlSplit.length
  );
  switch (routeName) {
    case "documents":
      const savedDocument = new Document(await this.getDocument(documentId));
      try {
        const { title, content, tmpSaveDate } = getItem(
          "documents/" + documentId
        );
        if (tmpSaveDate > savedDocument.updatedAt) {
          if (confirm("임시저장된 데이터가 있습니다. 불러오시겠습니까?")) {
            this.editor.state = savedDocument.cloneNewDocument({
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
      this.editor.state = savedDocument;
      removeItem("documents/" + documentId);
      break;
  }
};
