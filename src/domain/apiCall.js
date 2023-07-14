import { request } from './api';
import { push } from './router';

export { getDocument, createDocument, updateDocument, deleteDocument };
const getDocument = async (id) => {
  return await request(`/documents/${id}`, {
    method: 'GET',
  });
};

const createDocument = async (document) => {
  return await request(`/documents`, {
    method: 'POST',
    body: JSON.stringify(document),
  });
};

const updateDocument = async (id, document) => {
  return await request(`/documents/${id}`, {
    method: 'PUT',
    body: JSON.stringify(document),
  });
};

const deleteDocument = async (id) => {
  await request(`/documents/${id}`, {
    method: 'DELETE',
  });
  push('/');
};
