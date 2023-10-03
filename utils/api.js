export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "jeongwuk927",
      },
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (e) {
    alert(e.message);
  }
};
