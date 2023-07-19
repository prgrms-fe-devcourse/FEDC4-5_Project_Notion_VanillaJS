const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

const getHeader = () => {
  const username = 'kutta97';
  return {
    'Content-Type': 'application/json',
    'x-username': username,
  };
};

const request = async (url, options = {}) => {
  const data = await fetch(`${API_END_POINT}${url}`, {
    ...options,
  })
    .then((response) => {
      if (!response.ok) throw new Error('API request error');

      return response.json();
    })
    .catch((e) => {
      console.error(e);
    });

  return data;
};

const get = async (url) =>
  request(url, {
    headers: getHeader(),
    method: 'GET',
  });

const post = async (url, data) =>
  request(url, {
    headers: getHeader(),
    method: 'POST',
    body: JSON.stringify(data),
  });

const put = async (url, data) =>
  request(url, {
    headers: getHeader(),
    method: 'PUT',
    body: JSON.stringify(data),
  });

const del = async (url) =>
  request(url, {
    headers: getHeader(),
    method: 'DELETE',
  });

const api = {
  get,
  post,
  put,
  del,
};

export default api;
