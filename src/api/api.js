export const API_END_POINT = `https://kdt-frontend.programmers.co.kr/documents`;

export const requestDocuments = async (
  url,
  options = { headers: { "x-username": "jlee0505" } }
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
