export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr/documents';
export const MOCK_API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

export const mockRequest = async ({ url = '', options = {} }) => {
  try {
    const res = await fetch(`${MOCK_API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('API 처리중 뭔가 이상합니다');

    return await res.json();
  } catch (error) {
    alert(error);
  }
};

export async function request(url = '', options = {}) {
  try {
    console.log(typeof url);
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
    alert(error);
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
      title: 'undefined',
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
