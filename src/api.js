const API_END_POINT =
  "https://kdt-frontend.programmers.co.kr";
const USER_NAME = "cszzi1006";

export const request = async (url, options = {}) => {
  console.log(url, options);
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": USER_NAME,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 오류");
  } catch (error) {
    alert(error.message);
  }
};
