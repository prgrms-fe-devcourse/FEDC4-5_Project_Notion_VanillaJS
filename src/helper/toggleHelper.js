export const recursiveInitToggleData = (
  documents,
  data = {}
) => {
  documents.forEach(document => {
    data[document.id] = false;
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
  return {
    ...data,
    [id]: false,
    [parent]: true,
  };
};

export const updateToggleItem = ({ data, id }) => {
  return {
    ...data,
    [id]: !data[id],
  };
};

export const deleteToggleItem = ({ data, id }) => {
  const nextData = { ...data };
  delete nextData[id];
  return nextData;
};
