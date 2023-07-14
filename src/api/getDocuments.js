import { request } from '../domain/request';

export async function getDocuments() {
  const documents = await request('documents', {
    method: 'GET',
  });
  return documents;
}
