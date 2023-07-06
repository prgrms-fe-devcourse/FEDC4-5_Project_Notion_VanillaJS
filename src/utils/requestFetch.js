import { request } from "./api.js";

export const fetchGetLists = async () => {
  return await request("/documents", {
    method: "GET",
  });
};

export const fetchCreatePost = async (post) => {
  return await request("/documents", {
    method: "POST",
    body: JSON.stringify(post),
  });
};

export const fetchEditPost = async (post) => {
  await request(`/documents/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });
};

export const fetchDeletePost = async (id) => {
  await request(`/documents/${id}`, {
    method: "DELETE",
  });
};

export const fetchPost = async (id) => {
  return await request(`/documents/${id}`);
};
