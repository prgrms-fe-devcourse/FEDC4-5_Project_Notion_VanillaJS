import { Store } from '@/core';
import { createPost, deletePost, fetchPost, updatePost } from '../api/request';

/**
 *
 * state: postId, title, content, updated
 * action: Init, Update
 */
async function reducer({ state, actionType, payload }) {
  switch (actionType) {
    case 'INIT_POST':
      const post = await fetchPost(payload.id);
      return post;
    case 'CREATE_POST':
      const newPost = await createPost(payload?.parent);
      return newPost;
    case 'UPDATE':
      await updatePost(payload.post);
      const updatedPost = await fetchPost(payload.post.id);
      return updatedPost;
    case 'DELETE':
      await deletePost(payload.id);
      return;
  }
}

export const PostStore = new Store(reducer);
