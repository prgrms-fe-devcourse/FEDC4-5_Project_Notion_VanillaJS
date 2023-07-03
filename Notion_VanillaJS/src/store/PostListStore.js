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
    case 'INIT':
      const postList = await fetchPostList();
      return { ...state, postList };
    case 'DELETE':
      await deletePost(payload.id);
      showModal('DELETE');
      const deletedPostList = await fetchPostList();
      return { ...state, postList: deletedPostList };
  }
}

export const PostListStore = new Store(reducer);
