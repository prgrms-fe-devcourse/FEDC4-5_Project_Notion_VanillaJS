import { request } from './request.js';

export const getRootAPI = async() => {
  const url = '/documents';
  const option = {
    headers: {
      'x-username': 'suyeon',
    }
  }
  const data = await request(url, option);

  return data;
}

export const getContentAPI = async(pathname) => {
  const url = pathname;
  const option = {
    headers: {
      'x-username': 'suyeon',
    }
  };
  const data = await request(url, option);

  return data;
}

export const createAPI = async(document) => {
  const url = '/documents'
  const option = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'x-username': 'suyeon'
    }, 
    body: JSON.stringify(document)
  };
  const data = await request(url, option);

  return data;
}

export const editAPI = async(pathname, document) => {
  const url = pathname;
  const option = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'x-username': 'suyeon'
    }, 
    body: JSON.stringify(document)
  };
  const data = await request(url, option);
}

export const removeAPI = async(pathname) => {
  const url = pathname;
  const option = {
    headers: {
      'x-username': 'suyeon'
    },
    method: 'DELETE'
  };
  const data = await request(url, option);

  return data;
}