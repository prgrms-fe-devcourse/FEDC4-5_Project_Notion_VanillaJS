import BaseAPI from './baseApi.js';
import { API_HEADER, API_END_POINT } from '../constants/api.js';

export async function getDocumentLists(headerName) {
    const options = {
        ...API_HEADER(headerName),
    };

    return await BaseAPI(API_END_POINT.GET_DOCUMENT_LISTS, options);
}

export async function getDocumentDetail(id, headerName) {
    let apiEndPoint = API_END_POINT.GET_DOCUMENT_DETAIL;
    apiEndPoint = apiEndPoint.replace('documentId', id);

    const options = {
        ...API_HEADER(headerName),
    };

    return await BaseAPI(apiEndPoint, options);
}

export async function postDocument(body, headerName) {
    const options = {
        ...API_HEADER(headerName),
        method: 'POST',
        body: JSON.stringify(body),
    };
    return await BaseAPI(API_END_POINT.POST_DOCUMENT, options);
}
//
export async function updateDocument(id, headerName, body) {
    let apiEndPoint = API_END_POINT.PUT_DOCUMENT;
    apiEndPoint = apiEndPoint.replace('documentId', id);

    const options = {
        ...API_HEADER(headerName),
        method: 'PUT',
        body: JSON.stringify(body),
    };

    return await BaseAPI(apiEndPoint, options);
}

export async function deleteDocument(id, headerName) {
    let apiEndPoint = API_END_POINT.DELETE_DOCUMENT;
    apiEndPoint = apiEndPoint.replace('documentId', id);

    const options = {
        ...API_HEADER(headerName),
        method: 'DELETE',
    };

    return await BaseAPI(apiEndPoint, options);
}
