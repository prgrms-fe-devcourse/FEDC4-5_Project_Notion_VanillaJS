import { request } from "../service/index.js";

export const documentService = {
  getDataList: async () => {
    return request("/documents");
  },
  getData: async (id) => {
    return await request(`/documents/${id}`);
  },
  addData: async (data) => {
    return await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        parent: data.id,
      }),
    });
  },
  deleteData: async (id) => {
    await request(`/documents/${id}`, {
      method: "DELETE",
    });
  },
  updateData: async (id, data) => {
    await request(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
