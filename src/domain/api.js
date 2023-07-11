import { VITE_API_END_POINT, VITE_USERNAME } from '../constants';
const API_FAILURE_MESSAGE = 'API 처리 중 뭔가 이상합니다!';
const API_ERROR_MESSAGE = '무엇인가 이상합니다!';

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
    throw new Error(API_FAILURE_MESSAGE);
  } catch (e) {
    throw new Error(API_ERROR_MESSAGE);
  }
};
