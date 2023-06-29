const NOTION_API = `https://kdt-frontend.programmers.co.kr`;
const config = {
  headers: {
    "x-username": "doggopawer",
  },
};

export const request = {
  getDocumentList: async () => {
    try {
      const response = await fetch(`${NOTION_API}/documents`, config);

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  },
  getDocumentOne: async (id) => {
    try {
      const response = await fetch(`${NOTION_API}/documents/${id}`, config);

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
