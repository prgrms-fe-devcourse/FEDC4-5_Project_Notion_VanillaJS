import { request } from './request.js';

export const fetchPostList = async () => {
  const response = await request('', {
    method: 'GET',
  });

  return response;
};

export const fetchPostDocument = async id => {
  const response = await request(`/${id}`, {
    method: 'GET',
  });

  return response;
};

export const fetchNewPost = async id => {
  const response = await request('', {
    method: 'POST',
    body: JSON.stringify({
      title: '제목 없음',
      parent: id,
    }),
  });

  return response;
};

export const modifyPost = async (id, postData) => {
  const response = await request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  });

  return response;
};

export const deletePost = async id => {
  await request(`/${id}`, {
    method: 'DELETE',
  });
};

export const changeParentId = async (parentId, document) => {
  const { id } = await fetchNewPost(parentId);

  await modifyPost(id, {
    title: document.title,
    content: document.content,
  });

  return id;
};
