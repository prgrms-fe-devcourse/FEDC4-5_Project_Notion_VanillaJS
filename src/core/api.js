export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, option = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...option,
      headers: {
        "Content-Type": "application/json",
        "x-username": "1eecan",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리 중 이상 발생");
  } catch (e) {
    console.log(e.message);
  }
};
