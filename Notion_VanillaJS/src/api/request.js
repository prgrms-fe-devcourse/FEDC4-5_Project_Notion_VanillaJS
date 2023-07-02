export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr/documents';

import { push } from '@/core';

export async function request(url = '', options = {}) {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'dongja',
      },
    });

    if (!res.ok) throw new Error('API 처리중 뭔가 이상합니다');

    return await res.json();
  } catch (error) {
    alert('에러가 발생했습니다');
    push('/');
  }
}

export async function fetchPostList() {
  const postList = await request();
  return postList;
}

export async function fetchPost(postId) {
  const post = await request(`/${postId}`);
  return post;
}

export async function createPost(parent = null) {
  const newPost = await request('', {
    method: 'POST',
    body: JSON.stringify({
      title: '처음 제목',
      parent,
    }),
  });

  return newPost;
}

export async function updatePost(post) {
  await request(`/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
  });
}

export async function deletePost(postId) {
  await request(`/${postId}`, {
    method: 'DELETE',
  });
}
