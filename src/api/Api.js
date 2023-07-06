import API_BASE_URL from "../utils/ApiKey.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "dahyeon-Ju",
      },
    });

    if (res.ok) return await res.json();

    throw new Error("API 처리 실패");
  } catch (error) {
    alert(error.message);
  }
};
