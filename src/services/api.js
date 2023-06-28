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

// const res = await request('/documents', {
//   method: 'POST',
//   body: {
//     title: "test",
//     "parent": null
//   }
// });