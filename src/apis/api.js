import { request } from './request.js';

export const getDocuments = () => request('/documents');
export const getDocument = (id) => request(`/documents/${id}`);

export const addDocument = (title, parent = null) =>
  request('/documents', {
    method: 'POST',
    body: JSON.stringify({ title, parent }),
  });

export const modifyDocument = ({ title, content }, documentId) =>
  request(`/documents/${documentId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
  });

export const removeDocument = (documentId) => request(`/documents/${documentId}`, { method: 'DELETE' });
