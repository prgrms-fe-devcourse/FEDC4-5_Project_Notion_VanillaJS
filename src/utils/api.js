import { API_END_POINT, UNIQUE_KEY } from "../constants/constants.js";
import { replaceHistory } from "./router.js";
import { getLocalStorageItem, removeLocalStorageItem } from "./storage.js";

export const request = async (url, option = {}) => {
  try{
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...option,
      headers : {
        "Content-Type" : "application/json",
        "x-username" : UNIQUE_KEY        
      }
    });

    if(res.ok){
      const json = await res.json();
      return json;
    }else{
      throw new Error("API 호출 오류");
    }
  }catch(e){
    alert(e.message);
    replaceHistory("/");
  }
}

export const fetchDocuments = async () => {
  const document = await request(`/documents`);
  return document;
}

export const fetchContent = async (id, localSaveKey) => {
  if(!id){
    return null;
  }
  const tempContent = getLocalStorageItem(localSaveKey, null);
  if(tempContent && confirm("저장된 작성글이 있습니다. 불러올까요?")){
    await editDocument(id, tempContent);
    removeLocalStorageItem(localSaveKey);
    return tempContent;
  }else{
    return await request(`/documents/${id}`);
  }
}

export const postNewDocument = async (id) => {
  const newDocument = {
    title : "",
    parent : id
  }
  return await request("/documents", {
    method : "POST",
    body : JSON.stringify(newDocument)
  })
}

export const deleteDocument = async (id) => {
  await request(`/documents/${id}`, {
    method : "DELETE"
  })
}

export const editDocument = async (id, post) => {
  await request(`/documents/${id}`, {
    method: "PUT",
    body : JSON.stringify(post)
  })
}