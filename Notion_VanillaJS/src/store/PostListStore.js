import { Store } from '@/core';
import { fetchPostList } from '../api/request';

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
  }
}

export const PostListStore = new Store(reducer);
