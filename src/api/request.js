export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr/documents';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': '1g2g',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('api 처리 중 뭔가 이상합니다.');
  } catch (e) {
    console.log(e);
  }
};
