import { baseEncode } from '../utils/baseEncode.js';

const CONTENT_TYPE = 'application/json';
export const API_HEADER = (name) => {
    return {
        headers: {
            'x-username': baseEncode(name),
            'Content-Type': CONTENT_TYPE,
        },
    };
};

export const API_END_POINT = {
    GET_DOCUMENT_LISTS: '/documents',
    GET_DOCUMENT_DETAIL: '/documents/documentId',
    POST_DOCUMENT: '/documents',
    PUT_DOCUMENT: '/documents/documentId',
    DELETE_DOCUMENT: '/documents/documentId',
};
