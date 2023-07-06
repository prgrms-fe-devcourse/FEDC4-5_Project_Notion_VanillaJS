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
    console.log(error);
  }
};

export const getAllDocuments = async () => {
  const documents = await request('');
  return documents;
};

export const getDocument = async id => {
  const document = await request(`/${id}`);
  return document;
};

export const createDocument = async (title, parentId) => {
  const res = request('', {
    method: 'POST',
    body: JSON.stringify({
      title,
      parent: parentId,
    }),
  });

  return res;
};

export const updateDocument = async (id, title, content) => {
  const res = await request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
  });

  return res;
};

export const deleteDocument = async id => {
  const res = await request(`/${id}`, {
    method: 'DELETE',
  });
  return res;
};
