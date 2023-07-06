export const insertIsOpen = (documents, currentOpenStatus) => {
  return (
    documents.length > 0 &&
    documents.map((document) => {
      return {
        id: document.id,
        title: document.title,
        isOpen: currentOpenStatus[document.id] ?? false,
        documents: insertIsOpen(document.documents, currentOpenStatus),
      };
    })
  );
};
