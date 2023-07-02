export const API_SERVER = 'https://kdt-frontend.programmers.co.kr/documents';

export const request = async (url = '', options = {}) => {
  try {
    const res = await fetch(`${API_SERVER}${url}`, {
      ...options,
      headers: {
        'x-username': 'juyeon',
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 처리중 오류 발생');
  } catch (error) {
    console.error(error);
  }
};

export const getAllDocuments = async () => {
  return request('');
};

export const getDocument = async id => {
  return request(`/${id}`);
};

export const createDocument = async document => {
  return request('', {
    method: 'POST',
    body: JSON.stringify(document),
  });
};

export const updateDocument = async (id, document) => {
  return request(`${id}`, {
    method: 'PUT',
    body: JSON.stringify(document),
  });
};

export const deleteDocument = async id => {
  return request(`/${id}`, {
    method: 'DELETE',
  });
};
