export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "leeminhee119",
      },
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
    throw new Error("API 호출 오류");
  } catch (e) {
    alert(e.message);
  }
};

export const readRootDocuments = async () => {
  return await request("/documents");
};

export const readDocument = async (id) => {
  return await request(`/documents/${id}`);
};

export const createDocument = async (parentId) => {
  return await request("/documents", {
    method: "POST",
    body: JSON.stringify({
      title: "",
      parent: parentId,
    }),
  });
};

export const updateDocument = async (id, document) => {
  await request(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify(document),
  });
};

export const deleteDocument = async (documentId) => {
  await request(`/documents/${documentId}`, {
    method: "DELETE",
  });
};
