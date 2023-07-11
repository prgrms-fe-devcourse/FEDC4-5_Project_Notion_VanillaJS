import { VITE_API_END_POINT, VITE_USERNAME, errorMessages } from '../constants';

// API 요청
export const request = async (url, options = {}) => {
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
    throw new Error('api 요청 실패');
  } catch (e) {
    throw new Error(`${errorMessages.API_ERROR_MESSAGE} ${e.message}`);
  }
};
