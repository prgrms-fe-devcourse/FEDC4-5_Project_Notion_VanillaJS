export const API_END_POINT = `https://kdt-frontend.programmers.co.kr/documents`;
export const USERNAME = "roto";

export const request = async (
  url,
  options = { headers: { "x-username": USERNAME } }
) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, options);
    if (res.ok) {
      const json = res.json();
      return json;
    }

    throw new Error("API 호출 오류");
  } catch (e) {
    alert(e.message); // UI까지 찍는게 best
  }
};

export const HTTP_METHODS = {
  GET(options = {}) {
    return {
      method: "GET",
      headers: {
        ["Cache-Control"]: options.cache ? "no-cache" : null,
        "x-username": USERNAME,
      },
    };
  },
  POST(data) {
    return {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        ["x-username"]: USERNAME,
        "Content-Type": "application/json",
      },
    };
  },
  PUT(data) {
    return {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        ["x-username"]: USERNAME,
        "Content-Type": "application/json",
      },
    };
  },
  DELETE() {
    return {
      method: "DELETE",
      headers: { ["x-username"]: USERNAME },
    };
  },
};
