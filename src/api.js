const NOTION_API = `https://kdt-frontend.programmers.co.kr/documents`;
const config = (method, body) => ({
  method,
  headers: {
    "Content-Type": "application/json",
    "x-username": "doggopawer",
  },
  body: JSON.stringify(body),
});

export const request = {
  getDocumentList: async () => {
    try {
      const response = await fetch(`${NOTION_API}`, config("GET"));

      const result = await response.json();
      return result;
    } catch (error) {
      alert("문서데이터를 불러오지 못했습니다!");
      return error;
    }
  },
  getDocumentItem: async (id) => {
    try {
      const response = await fetch(`${NOTION_API}/${id}`, config("GET"));

      const result = await response.json();
      return result;
    } catch (error) {
      alert("해당 문서를 불러오지 못했습니다!");
    }
  },
  addDocumentItem: async (parentId) => {
    try {
      const response = await fetch(
        `${NOTION_API}`,
        config("POST", {
          title: "새 문서",
          parent: parentId,
        })
      );

      const result = await response.json();
      return result;
    } catch (error) {
      alert("새 문서 생성에 실패했습니다!");
    }
  },
  updateDocumentItem: async (id, updateBody) => {
    try {
      const response = await fetch(
        `${NOTION_API}/${id}`,
        config("PUT", updateBody)
      );

      const result = await response.json();
      return result;
    } catch (error) {
      alert("해당 문서 수정에 실패했습니다!");
    }
  },
  deleteDocumentItem: async (id) => {
    try {
      const response = await fetch(`${NOTION_API}/${id}`, config("DELETE"));

      const result = await response.json();
      return result;
    } catch (error) {
      alert("해당 문서 삭제에 실패했습니다!");
    }
  },
};
