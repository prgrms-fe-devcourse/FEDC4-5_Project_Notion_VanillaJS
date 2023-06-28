const BASE_URL = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) return await res.json();

    throw new Error("API 처리 실패");
  } catch (error) {
    alert(error.message);
  }
};
