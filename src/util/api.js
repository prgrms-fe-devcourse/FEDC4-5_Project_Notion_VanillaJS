const API_ENDPOINT = 'https://kdt-frontend.programmers.co.kr/documents';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_ENDPOINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'nayeon',
      },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log(err);
  }
};
