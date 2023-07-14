import { request } from '../domain/request';

export async function deleteDocument(documentId) {
  const document = await request(`documents/${documentId}`, {
    method: 'DELETE',
  });
  return document;
}
