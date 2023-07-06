const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        'x-username': 'bbearcookie',
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('서버에 대한 요청이 실패했습니다.');
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
