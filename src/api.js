export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  const res = await fetch(`${API_END_POINT}${url}`, {
    ...options,
    headers: {
      "x-username": "sungbird",
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};
