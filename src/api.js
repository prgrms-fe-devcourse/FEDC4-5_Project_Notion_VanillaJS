export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'x-username': 'whj',
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('API처리중 문제 발생!!');
  } catch (e) {
    console.log(e.message);
  }
};
