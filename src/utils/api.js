export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const getApi = async (username, id = "") => {
  try {
    const res = await fetch(`${API_END_POINT}/documents/${id}`, {
      headers: {
        "x-username": username,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) return await res.json();
    throw new Error("API GET 처리 중 무엇인가 이상합니당!");
  } catch (e) {
    alert(e.message);
  }
};

export const postApi = async (username, id = null) => {
  try {
    const res = await fetch(`${API_END_POINT}/documents`, {
      headers: {
        "x-username": username,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: "새 문서",
        parent: id,
      }),
    });

    if (res.ok) return await res.json();
    throw new Error("API POST 처리 중 무엇인가 이상합니당~");
  } catch (e) {
    alert(e.message);
  }
};

export const putApi = async (username, id, title, content) => {
  try {
    const res = await fetch(`${API_END_POINT}/documents/${id}`, {
      headers: {
        "x-username": username,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    if (res.ok) return await res.json();
    throw new Error("API PUT 처리 중 무엇인가 이상하다고요!");
  } catch (e) {
    alert(e.message);
  }
};

export const deleteApi = async (username, id) => {
  try {
    const res = await fetch(`${API_END_POINT}/documents/${id}`, {
      headers: {
        "x-username": username,
      },
      method: "DELETE",
    });

    if (res.ok) return await res.json();
    throw new Error("API DELETE 처리 중 무엇인가 이상하다고 좀!");
  } catch (e) {
    alert(e.message);
  }
};
