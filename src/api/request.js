import { PATH } from "../constants/path.js";
import { push } from "../utils/route.js";

const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (path, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "jgjgill",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 에러가 발생했습니다!");
  } catch (err) {
    throw new Error(err.message);
  }
};
