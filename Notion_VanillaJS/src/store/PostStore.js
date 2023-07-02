import { Store } from '@/core';
import { createPost, deletePost, fetchPost, updatePost } from '../api/request';
import { push } from '@/core';

/**
 *
 * state: postId, title, content, updated
 * action: Init, Update
 */
async function reducer({ state, actionType, payload }) {
  switch (actionType) {
    case 'SAVE_POST':
      return { ...state, post: { ...state.post, ...payload } };
    case 'GET_POST':
      const post = await fetchPost(payload.id);
      return { ...state, post: { ...post, content: post.content ?? '' } };
    case 'CREATE_POST':
      const newPost = await createPost(payload?.parent);
      push(`/posts/${newPost.id}`);
      return { ...state, post: { ...newPost, content: '' } };
    case 'UPDATE_POST':
      await updatePost(state.post);
      const updatedPost = await fetchPost(state.post.id);
      return { ...state, post: updatedPost };
    case 'DELETE_POST':
      await deletePost(payload.id);
      return;
  }
}

export const PostStore = new Store(reducer);
