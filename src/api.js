export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr/documents';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'x-username': 'ea',
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      console.log('ok 확인');
      return await res.json();
    }

    throw new Error('API 처리중 문제가 발생했습니다.');
  } catch (e) {
    alert(e.message);
  }
};

export const createNewDocument = async (id = null) => {
  const res = await request('', {
    method: 'POST',
    body: JSON.stringify({
      title: 'untitle',
      parent: id,
    }),
  });
  return res;
};

export const getAllDocuments = async () => {
  const res = await request('');
  return res;
};

export const getDocumentId = async (id) => {
  const res = await request(`/${id}`);
  return res;
};

export const deleteDocument = async (id) => {
  await request(`/${id}`, {
    method: 'DELETE',
  });
};
