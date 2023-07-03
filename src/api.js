const NOTION_API = `https://kdt-frontend.programmers.co.kr`;
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
      const response = await fetch(`${NOTION_API}/documents`, config("GET"));

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  },
  getDocumentItem: async (id) => {
    try {
      const response = await fetch(
        `${NOTION_API}/documents/${id}`,
        config("GET")
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  },
  addDocumentItem: async (parentId) => {
    try {
      const response = await fetch(
        `${NOTION_API}/documents`,
        config("POST", {
          title: "새 문서",
          parent: parentId,
        })
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  },
  updateDocumentItem: async (id, updateBody) => {
    try {
      console.log("api 호출");
      const response = await fetch(
        `${NOTION_API}/documents/${id}`,
        config("PUT", updateBody)
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
