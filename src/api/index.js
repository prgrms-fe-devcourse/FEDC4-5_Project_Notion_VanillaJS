import { apiClient } from "../utils/apiClient"
import storage from "../utils/storage"

const documentAdapter = () => {
  let user = storage.getItem("currentUser")
  const updateCurrentUser = () => {
    user = storage.getItem("currentUser")
  }

  return {
    updateCurrentUser,
    getDocuments: async () => await apiClient("/documents", "GET", null, user),
    getDocumentsContent: async (id) => await apiClient(`/documents/${id}`, "GET", null, user),
    createDocument: async ({ title, parentId }) =>
      await apiClient("/documents", "POST", { title: title, parent: parentId }, user),
    updateDocument: async (id, { title, content }) =>
      await apiClient(`/documents/${id}`, "PUT", { title: title, content: content }, user),
    deleteDocument: async (id) => await apiClient(`/documents/${id}`, "DELETE", null, user),
  }
}

export default documentAdapter()
