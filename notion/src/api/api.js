export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

// API 요청
export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'x-username': 'BOMI',
        'Content-Type': 'application/json',
      }
    })

    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 처리중 에러 발생');
  } catch(e) {
    console.log(e.message);
  }
}

// Documents 가져오기
export const getDocument = async (url) => {
  const data = await request(url, {
    method: "GET"
  })

  return data;
}

// Document 생성하기
export const postDocument = async (url, id = null) => {
  const data = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      title: '📔 빈 페이지',
      parent: id
    })
  })

  return data;
}

// 특정 Document 수정하기
export const putDocument = async (url, title, content) => {
  const data = await request(url, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content
    })
  })

  return data;
}

// 특정 Document 삭제하기
export const deleteDocument = async (url) => {
  await request(url, {
    method: "DELETE"
  })
}
