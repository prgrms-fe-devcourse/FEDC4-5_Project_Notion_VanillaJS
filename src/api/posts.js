import { HTTP_METHODS, request } from "./core.js";

export const getAllPosts = async () => {
  const data = await request(``, HTTP_METHODS.GET());
  return data;
};
export const getPostById = async (id) => {
  const data = await request(`/${id}`, HTTP_METHODS.GET());
  return data;
};
export const postPost = async (id) => {
  const data = await request(
    "",
    HTTP_METHODS.POST({ title: "new", parent: id })
  );
  return data;
};
export const putPost = async (id, title, content) => {
  const data = await request(`/${id}`, HTTP_METHODS.PUT({ title, content }));
  return data;
};
export const deletePost = async (id) => {
  await request(`/${id}`, HTTP_METHODS.DELETE());
};
