const API_END_POINT = 'https://kdt-frontend.programmers.co.kr/documents';
const HTTP_STATUS_RESPONSE_OK = 200;
const HTTP_STATUS_RESPONSE_NOT_FOUND = 404;
export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}/${url}`, {
      ...options,
      headers: {
        'x-username': 'sscoderati',
        'Content-Type': 'application/json',
      },
    });
    const { status } = res;
    if (status === HTTP_STATUS_RESPONSE_OK) {
      return res.json();
    } else if (status === HTTP_STATUS_RESPONSE_NOT_FOUND) {
      dispatchEvent(new Event('404-not-found'));
    }
  } catch (error) {
    console.log(error.message);
  }
};
