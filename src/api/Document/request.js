import { API_ENDPOINT, USER_NAME } from '../../constants/api.js';
import { ERROR_MSG } from '../../constants/error.js';

const { API_ERROR } = ERROR_MSG;

const request = async (url, options = {}) => {
  const res = await fetch(`${API_ENDPOINT}${url}`, {
    ...options,
    headers: {
      'Content-type': 'application/json',
      'x-username': `${USER_NAME}`,
    },
  });

  if (res.ok) {
    return res.json();
  }
  switch (res.status) {
    case 400:
      throw new Error(API_ERROR.ERROR_400);
    case 401:
      throw new Error(API_ERROR.ERROR_401);
    case 403:
      throw new Error(API_ERROR.ERROR_403);
    case 404:
      throw new Error(API_ERROR.ERROR_404);
    // Handle other status codes as needed
    default:
      throw new Error(API_ERROR.ERROR_DEFAULT);
  }
};

export default request;
