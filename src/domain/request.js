import { VITE_API_END_POINT, VITE_USERNAME } from '../config/apiConfig';
const MESSAGE = {
  API_FAILURE: 'API 처리 중 뭔가 이상합니다!',
  API_ERROR: '무엇인가 이상합니다!',
};
// API 요청
const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${VITE_API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': `${VITE_USERNAME}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(MESSAGE.API_FAILURE);
  } catch (e) {
    throw new Error(MESSAGE.API_ERROR);
  }
};

export default request;
