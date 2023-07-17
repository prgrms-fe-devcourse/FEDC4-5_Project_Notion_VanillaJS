import { Store } from '@/core';
import { fetchPostList, deletePost } from '../api/request';
import { Modal } from '@/components';

/**
 *
 * state: posts
 * action: Init, Update
 */
async function reducer({ state, actionType, payload }) {
  const modal = new Modal();
  switch (actionType) {
    case 'UPDATE_POST_LIST':
      const postList = await fetchPostList();
      return { ...state, postList };
    case 'DELETE_POST_LIST':
      await deletePost(payload.id);
      modal.showModal('DELETE');
      const deletedPostList = await fetchPostList();
      return { ...state, postList: deletedPostList };
  }
}

export const PostListStore = new Store(reducer);
