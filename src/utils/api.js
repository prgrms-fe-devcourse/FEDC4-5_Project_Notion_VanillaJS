export const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "MinwooP",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리 중 뭔가 이상합니다 !");
  } catch (e) {
    alert(e.message);
  }
};

export const getAllDocumentAPI = async () => {
  const documentList = await request("");
  return documentList;
};

export const getDocumentAPI = async (documentId) => {
  const document = await request(`/${documentId}`);
  return document;
};

export const createDocumentAPI = async (parentDocumentId = null) => {
  const createdDocument = await request("", {
    method: "POST",
    body: JSON.stringify({
      title: "new Document",
      parent: parentDocumentId,
    }),
  });
  return createdDocument;
};

export const deleteDocumentAPI = async (documentId) => {
  await request(`/${documentId}`, {
    method: "DELETE",
  });
};

export const modifyDocumentAPI = async (documentId, newTitle, newContent) => {
  await request(`/${documentId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: newTitle,
      content: newContent,
    }),
  });
};
