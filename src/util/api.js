import { API_HEADER_NAME, API_END_POINT } from "../constant.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(
      `${API_END_POINT}${url.indexOf("/") === 0 ? url : `/${url}`}`,
      {
        ...options,
        headers: {
          "x-username": API_HEADER_NAME,
        },
      }
    );
    if (res.ok) {
      return await res.json();
    }
    throw Error(`api요청이 잘 못 되었습니다`);
  } catch (e) {
    alert(e.message);
  }
};
