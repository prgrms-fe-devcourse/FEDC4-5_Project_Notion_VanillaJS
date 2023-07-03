import { Component } from '@/core';
import { PostStore } from '@/store';

export default class ChildPosts extends Component {
  setup() {
    PostStore.subscribe({
      listenerKey: this.constructor.name,
      listener: this.render.bind(this),
    });
  }

  templates() {
    const childPosts = PostStore.getState()?.post?.documents;
    console.log(childPosts);
    return childPosts
      ? `<ul>
      ${childPosts
        .map(
          (childPost) => `
      <li data-id = ${childPost.id} class ='child-post'>
        <h2 class='child-post-title'>${childPost.title}</h2>
    </div>
      </li>`
        )
        .join('')}
    </ul>`
      : '';
  }
}
