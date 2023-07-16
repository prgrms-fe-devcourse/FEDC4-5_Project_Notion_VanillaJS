export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, option = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...option,
      headers: {
        "Content-Type": "application/json",
        "x-username": "woojiho",
      },
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error("API 호출 오류");
  } catch (error) {
    alert(error.message);
  }
};
