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

// 모든 document 조회
export const getAllDocumentAPI = async () => {
  const documentList = await request("");
  return documentList;
};

// 특정 document 조회
export const getDocumentAPI = async (documentId) => {
  const document = await request(`/${documentId}`);
  return document;
};

// 특정 document 생성
export const createDocumentAPI = async (documentId = null) => {
  const createdDocument = 
  await request("", {
    method: "POST",
    body: JSON.stringify({
      title: "new Document",
      parent: documentId,
    }),
  });
  return createdDocument;
};

// 특정 document 삭제
export const deleteDocumentAPI = async (documentId) => {
  await request(`/${documentId}`, {
    method: "DELETE",
  });
};

// 특정 document 수정
export const modifyDocumentAPI = async (documentId, newTitle, newContent) => {
  await request(`/${documentId}`, {
    // 뭔가 클로져 때문에 위험할 지도? this.state.selectedDocumentId를 전달하는게 낫지 않을까
    method: "PUT",
    body: JSON.stringify({
      title: newTitle,
      content: newContent,
    }),
  });
};
