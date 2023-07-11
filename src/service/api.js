import { API_ENDPOINT, API_HEADER_X_USERNAME } from "../constants.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_ENDPOINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": API_HEADER_X_USERNAME,
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API Error");
  } catch (e) {
    alert(e.message);
  }
};
