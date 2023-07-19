import api from '@utils/api';

export const getDocumentList = async () => api.get('/documents');

export const getDocument = async (documentId) =>
  api.get(`/documents/${documentId}`);

export const createDocument = async (document) =>
  api.post('/documents', document);

export const updateDocument = async (documentId, document) =>
  api.put(`/documents/${documentId}`, document);

export const deleteDocument = async (documentId) =>
  api.del(`/documents/${documentId}`);
