import { request } from '../domain/request';

export async function postDocument({ title, parent }) {
  const document = await request('documents', {
    method: 'POST',
    body: JSON.stringify({
      title,
      parent,
    }),
  });
  return document;
}
