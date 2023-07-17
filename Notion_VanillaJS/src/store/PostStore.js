import { Store, push } from '@/core';
import { createPost, deletePost, fetchPost, updatePost } from '../api/request';
import { Modal } from '@/components';

/**
 *
 * state: postId, title, content, updated
 * action: Init, Update
 */
async function reducer({ state, actionType, payload }) {
  const modal = new Modal();
  switch (actionType) {
    case 'INIT_POST':
      push('/');
      return { ...state, post: null };
    case 'SAVE_POST':
      return { ...state, post: { ...state.post, ...payload } };
    case 'GET_POST':
      const post = await fetchPost(payload.id);
      return { ...state, post: { ...post, content: post?.content ?? '' } };
    case 'CREATE_POST':
      const newPost = await createPost(payload?.parent);
      modal.showModal('CREATE');
      push(`/documents/${newPost.id}`);
      return { ...state, post: { ...newPost, content: '' } };
    case 'UPDATE_POST':
      await updatePost(state.post);
      const updatedPost = await fetchPost(state.post.id);
      modal.showModal('UPDATE');
      return { ...state, post: updatedPost };
    case 'DELETE_POST':
      await deletePost(payload.id);
      modal.showModal('DELETE_POST_LIST');
      return;
  }
}

export const PostStore = new Store(reducer);
