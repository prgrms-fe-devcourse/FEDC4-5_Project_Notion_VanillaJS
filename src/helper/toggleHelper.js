export const recursiveInitToggleData = (
  documents,
  data = []
) => {
  documents.forEach(document => {
    data.push({ id: `${document.id}`, toggle: false });
    if (
      document.documents &&
      document.documents.length > 0
    ) {
      recursiveInitToggleData(document.documents, data);
    }
  });
  return data;
};

export const createToggleItem = ({ data, parent, id }) => {
  const next = [
    ...data,
    { id: `${id}`, toggle: false },
  ].map(item =>
    item.id === parent ? { ...item, toggle: true } : item
  );
  return next;
};

export const updateToggleItem = ({ data, id }) => {
  return data.map(item =>
    item.id === id
      ? { ...item, toggle: !item.toggle }
      : item
  );
};

export const deleteToggleItem = ({ data, id }) => {
  return data.filter(data => data.id !== id);
};
