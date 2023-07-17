import { API_END_POINT, USER_NAME } from '../utils/constants.js';
import { push } from '../utils/router.js';

export const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Username': USER_NAME,
      },
    });

    if (response.ok) return await response.json();

    throw new Error('API에 문제가 있습니다.');
  } catch (e) {
    console.log(e.message);
  }
};

export const getDocumentList = () => {
  return request('/documents');
};

export const getDocument = async (documentId) => {
  const document = await request(`/documents/${documentId}`);
  return document;
};

export const createDocument = async (document) => {
  const newDocument = await request('/documents', {
    method: 'POST',
    body: JSON.stringify(document),
  });
  return newDocument.id;
};

export const updateDocument = async (id, data) => {
  const document = await request(`/documents/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  console.log(document);
};

export const onRemoveDocument = async (id) => {
  await request(`/documents/${id}`, {
    method: 'DELETE',
  });
  push('/');
};
