import API_ROOT_URL from '@constants/api';

const API_END_POINT = API_ROOT_URL;

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', 'x-username': 'wukddang' },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('API 호출에 실패했습니다.');
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default request;
