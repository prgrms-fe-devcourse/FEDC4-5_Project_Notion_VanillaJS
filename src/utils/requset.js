import { request } from "./api.js"

//document를 삭제합니다
export const deleteDocument = async(id)=>{
    await request(`/documents/${id}`, {
        method : "DELETE"
    })
    
}

//하위document 또는 상위document를 생성합니다
export const postDocument = async (id)=>{
    if(id){
        return await request("/documents", { 
            method : "POST",
            body : JSON.stringify({
                title : "제목 없음",
                parent : `${id}`
            })
        })
    }else{
        return await request("/documents", { 
            method : "POST",
            body : JSON.stringify({
                title : "",
                parent : ""
            })
        })
    }
}

//document를 수정합니다.
export const putDocument = async(document)=>{
    return await request(`/documents/${document.id}`, {
        method : "PUT",
        body : JSON.stringify({
            title : document.title,
            content : document.content
        })
    })
}

//특정 document를 불러옵니다.
export const fetchEditor = async(documentId)=>{
    const document = await request(`/documents/${documentId}`)
    return document
}


//전체 document를 불러옵니다.
export const fetchDocumentLists = async() =>{
    const lists = await request("/documents")
    return lists
}

