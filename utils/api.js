export const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "dudwns",
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 처리 오류");
  } catch (error) {
    throw new Error("존재하지 않는 페이지입니다.");
  }
};
