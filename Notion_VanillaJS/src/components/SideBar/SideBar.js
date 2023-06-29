import { Component } from '@/core';
import { PostListStore } from '../../store/PostListStore';

export default class SideBar extends Component {
  setup() {
    PostListStore.subscribe({
      listenerKey: this.constructor.name,
      listener: this.render.bind(this),
    });
  }

  templates() {
    const postList = PostListStore.getState();
    console.log(postList);
    return `<h1>sideBar</h1>`;
  }
}
