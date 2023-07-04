const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
const X_USERNAME = "roto";

export const request = async (url, option = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...option,
      headers: {
        "Content-Type": "application/json",
        "x-username": X_USERNAME,
      },
    });

    if (res.ok) {
      return res.json();
    }

    throw new Error("API 처리 중 뭔가 이상합니다!");
  } catch (e) {
    console.log(e.message);
  }
};
