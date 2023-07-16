import { request } from "../service/index.js";
import { DOCUMENTS_PATH } from "../constants/index.js";

export const documentService = {
  getDataList: async () => {
    return request(DOCUMENTS_PATH);
  },
  getData: async (id) => {
    return await request(`${DOCUMENTS_PATH}${id}`);
  },
  addData: async (data) => {
    return await request(DOCUMENTS_PATH, {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        parent: data.id,
      }),
    });
  },
  deleteData: async (id) => {
    await request(`${DOCUMENTS_PATH}${id}`, {
      method: "DELETE",
    });
  },
  updateData: async (id, data) => {
    await request(`${DOCUMENTS_PATH}${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
