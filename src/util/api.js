export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "leehyeonjun",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("올바르지 않은 접근 입니다.");
  } catch (e) {
    alert(e.message);
    history.replaceState(null, null, "/"); // 수정 뒤로가기 안되게
  }
};

export const documentsGet = async () => {};
