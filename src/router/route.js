import { removeItem, getItem } from "../storage/storage.js";
import { Document } from "../domain/index.js";

export const route = async ({ app, component, url }) => {
  if (component.state.id !== -1) {
    const { title, content } = component.state;
    app.saveDocumentToServer({ title, content });
  }
  history.pushState(null, null, url);
  const urlSplit = url.split("/");
  const [routeName, documentId] = urlSplit.slice(
    urlSplit.length - 2,
    urlSplit.length
  );
  switch (routeName) {
    case "documents":
      const savedDocument = new Document(await app.getDocument(documentId));
      try {
        const { title, content, tmpSaveDate } = getItem(
          "documents/" + documentId
        );
        if (tmpSaveDate > savedDocument.updatedAt) {
          if (confirm("임시저장된 데이터가 있습니다. 불러오시겠습니까?")) {
            component.state = savedDocument.cloneNewDocument({
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
      component.state = savedDocument;
      removeItem("documents/" + documentId);
      break;
  }
};
