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
    alert(e.message);
    console.error();
  }
};
