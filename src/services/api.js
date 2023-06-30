export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';
export const USER_NAME = 'pigeontwo';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': USER_NAME
      }
    })

    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 처리 중 오류 발생!');
  } catch (error) {
    console.log(error.message);
  }
}

export const requestAddDir = async (id = null) => {
  await request('/documents', {
    method: 'POST',
    body: JSON.stringify({
      title: "dir/New Dir",
      parent: id,
    })
  })
}

export const requestAddDoc = async (parentId = null) => {
  await request('/documents', {
    method: 'POST',
    body: JSON.stringify({
      title: "New Doc",
      parent: parentId,
    })
  })
}

export const requestDelItem = async (id) => {
  const res = await request(`/documents/${id}`, {
    method: 'DELETE'
  });
}