export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
export const API_X_USERNAME = "API_X_USERNAME_LIMJISEON";

export const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": API_X_USERNAME,
      },
    });

    if (response.ok) {
      return await response.json();
    }

    throw new Error("API 처리중 에러가 발생했습니다.");
  } catch (e) {
    console.error(e);
  }
};

export const getData = async (url) => {
  return request(url);
};

export const postData = async (id = null) => {
  return request("/documents", {
    method: "POST",
    body: JSON.stringify({
      title: "제목 없음",
      parent: id,
    }),
  });
};

export const deleteData = async (id) => {
  return request(`/documents/${id}`, {
    method: "DELETE",
  });
};

export const putData = async (id, post) => {
  return request(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });
};
