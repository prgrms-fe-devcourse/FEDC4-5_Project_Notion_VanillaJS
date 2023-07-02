import { Component, push } from '@/core';
import Editor from '../../components/Editor/Editor';
import styles from './PostEdit.module.css';
import { PostStore } from '@/store/PostStore';

export default class PostEdit extends Component {
  setup() {
    const [, , postId] = location.pathname.split('/');
    console.log(PostStore.getState());
    const id = PostStore.getState()?.post?.id;
    const isNew = postId === 'new';

    if (isNew)
      PostStore.dispatch({
        actionType: 'INIT_POST',
        payload: { id: 'new', title: '', content: '' },
      });
    else if (id !== postId)
      PostStore.dispatch({ actionType: 'GET_POST', payload: { id: postId } });
    this.state.id = postId;
  }

  templates() {
    return `<section class='${styles.Editor} Editor'>postEdit</section>`;
  }

  mounted() {
    const $editor = this.$target.querySelector('.Editor');
    Component.attach({
      constructor: Editor,
      $target: $editor,
      props: { id: this.state.id },
    });
  }

  // //TODO
  // onEditing(post) {
  //   setItem(postLocalSaveKey, {
  //     ...post,
  //     tempSaveData: new Date(),
  //   });

  // const isNew = this.state.postId === 'new';
  // if (isNew) {
  //   PostStore.dispatch({ actionType: 'CREATE_POST' });
  //   removeItem(postLocalSaveKey);
  //   return;
  // }

  //   // PostStore.dispatch({ actionType: 'UPDATE_POST', payload: post });
  //   // removeItem(postLocalSaveKey);
  // }
}
