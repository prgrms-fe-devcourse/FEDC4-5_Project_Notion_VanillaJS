export const insertIsOpen = (documents, currentOpenStatus) => {
  return (
    documents.length > 0 &&
    documents.map((documentData) => {
      return {
        id: documentData.id,
        title: documentData.title,
        isOpen: Boolean(currentOpenStatus[documentData.id]),
        documents: insertIsOpen(documentData.documents, currentOpenStatus),
      };
    })
  );
};
