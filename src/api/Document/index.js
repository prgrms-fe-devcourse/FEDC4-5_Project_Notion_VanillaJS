import request from './request.js';

const fetchDocument = async (id) => {
  try {
    const documentRes = await request(`/${id}`);
    if (documentRes) {
      return documentRes;
    }
  } catch (e) {
    throw new Error(e);
  }
};

const getDocuments = async () => {
  try {
    const documents = await request('/', {
      method: 'GET',
    });

    if (documents) {
      return documents;
    }
  } catch (e) {
    throw new Error(e);
  }
};

const updateDocument = async (document) => {
  const { id } = document;
  try {
    const updateDocumentRes = await request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(document),
    });

    if (updateDocumentRes) {
      return updateDocumentRes;
    }
  } catch (e) {
    throw new Error(e);
  }
};

const addNewDocument = async (parentId) => {
  try {
    const addNewDocumentRes = await request('/', {
      method: 'POST',
      body: JSON.stringify({
        title: '제목없음',
        parent: parentId || null,
      }),
    });
    return addNewDocumentRes;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteDocument = async (id) => {
  try {
    const deleteDocumentRes = await request(`/${id}`, {
      method: 'DELETE',
    });
    return deleteDocumentRes;
  } catch (e) {
    throw new Error(e);
  }
};

export {
  getDocuments,
  fetchDocument,
  updateDocument,
  deleteDocument,
  addNewDocument,
};
