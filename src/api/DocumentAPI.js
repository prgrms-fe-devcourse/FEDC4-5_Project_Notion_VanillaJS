const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}/${url}`, {
      ...options,
      headers: {
        "x-username": "sscoderati",
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return res.json();
    }
    throw new Error("Something Wrong during request");
  } catch (error) {
    console.log(error.message);
  }
};
