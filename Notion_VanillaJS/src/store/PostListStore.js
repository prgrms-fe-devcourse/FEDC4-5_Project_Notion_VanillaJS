import { Store } from '@/core';
import { fetchPostList, deletePost } from '../api/request';
import { showModal } from '@/utils';

/**
 *
 * state: posts
 * action: Init, Update
 */
async function reducer({ state, actionType, payload }) {
  switch (actionType) {
    case 'UPDATE_POST_LIST':
      const postList = await fetchPostList();
      return { ...state, postList };
    case 'DELETE_POST_LIST':
      await deletePost(payload.id);
      showModal('DELETE_POST_LIST');
      const deletedPostList = await fetchPostList();
      return { ...state, postList: deletedPostList };
  }
}

export const PostListStore = new Store(reducer);
