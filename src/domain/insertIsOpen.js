export const insertIsOpen = (documents, currentOpenStatus) => {
  return (
    documents.length > 0 &&
    documents.map((document) => {
      return {
        id: document.id,
        title: document.title,
        isOpen: Boolean(currentOpenStatus[document.id]),
        documents: insertIsOpen(document.documents, currentOpenStatus),
      };
    })
  );
};
