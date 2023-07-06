export const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents";

export const request = async (documentsId = '', options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${documentsId}`, {
      ...options,
      headers: {
        //"Content-Type": "application/json",
        "x-username": "hyun",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리중 에러가 발생했습니다.");
  } catch (e) {
    alert(e.message);
    console.error();
  }
};
