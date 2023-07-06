const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';
const USERNAME = 'kimminjae';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': USERNAME
      }
    })

    if (res.ok) {
      return res.json();
    }

    throw new Error('API Request Error');
  } catch (error) {
    alert(error.message)
  }
}

export const fetchList = async () => {
  const posts = await request('/documents', {
    method: 'GET',
  })
  return posts;
}

export const createPost = async (post) => {
  const newPost = await request('/documents', {
    method: 'POST',
    body: JSON.stringify(post),
  })
  return newPost;
}

export const deletePost = async (_id) => {
  await request(`/documents/${_id}`, {
    method: 'DELETE',
  })
}

export const updatePost = async (_id, postBody) => {
  await request(`/documents/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(postBody),
  })
}

export const fetchPost = async (_id) => {
  console.log(_id);
  const post = await request(`/documents/${_id}`);
  return post;
}