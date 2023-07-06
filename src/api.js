import { request } from "./request.js"

export const getDocuments = async() => {
    const documentData = await request('/documents', {
        method: "GET",
      });
    return documentData
}

export const getEditableDocuments = async(id) => {
    const documentData = await request(`/documents/${id}`)
    return documentData
}

export const createDocuments = async(content, parent) => {
    const createdData = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
            title: content,
            parent: parent,
        })
    }) 
    return createdData
}

export const deleteDocuments = async(id) => {
    await request(`/documents/${id}`, {
        method: 'DELETE'
    })
}

export const editDocuments = async(newDocument, id) => {
    await request(`/documents/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newDocument)
    })
}