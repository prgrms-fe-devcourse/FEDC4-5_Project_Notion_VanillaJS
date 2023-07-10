// API 요청

const VITE_API_END_POINT = "https://kdt-frontend.programmers.co.kr";
const VITE_USERNAME = "jisungkim";
export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${VITE_API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": `${VITE_USERNAME}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.log(e);
  }
};
