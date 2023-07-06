import { API } from "./constants.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API.END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": API.USER_NAME,
      },
    });

    if (res.ok) return res.json();

    throw new Error(`요청에 실패했습니다.`);
  } catch (e) {
    alert(e.message);
  }
};
