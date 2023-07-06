import { Component } from '@/core';
import styles from './Editor.module.css';
import { setItem, removeItem } from '@/api/storage';
import { PostStore, PostListStore } from '@/store/';
import { debounceSaveLocal } from '@/utils/';
import {
  isApplied,
  isSafeRange,
  applyStyle,
  deleteStyle,
  focusLastChar,
  isDefaultAlign,
  isSpan,
  changeStyle,
} from './helper';

export default class Editor extends Component {
  setup() {
    PostStore.subscribe({
      listenerKey: this.constructor.name,
      listener: this.render.bind(this),
    });
    this.state.isInit = false;
  }

  templates() {
    return `
      <input type='text' name='title' class='${styles.title}' placeholder='제목을 입력하세요'/>
      <section class =${styles.buttons}>
        <button data-style='fontWeight/bold'>
          <i class="fa-solid fa-bold"></i>
        </button>
        <button data-style='fontStyle/italic'>
          <i class="fa-solid fa-italic"></i>
        </button>
        <button data-style='textDecoration/underline'>
          <i class="fa-solid fa-underline"></i>
        </button>
        <button data-style='textDecoration/line-through'>
          <i class="fa-solid fa-strikethrough"></i>
        </button>
        <button data-style='align/start'>
          <i class="fa-solid fa-align-left"></i>
        </button>
        <button data-style='align/center'>
          <i class="fa-solid fa-align-center"></i>
        </button>
        <button data-style='align/end'>
          <i class="fa-solid fa-align-right"></i>
        </button>
      </section>
      <div name='content' class='${styles.content} content' placeholder='내용을 입력하세요' contenteditable></div>
    `;
  }

  render() {
    const { isInit } = this.state;

    if (!isInit) {
      this.$target.innerHTML = this.templates();
      this.setState({ isInit: true });
      return;
    }

    const { title, content } = PostStore.getState()?.post ?? {
      title: '로딩 중',
      content: '로딩 중',
    };

    this.$target.querySelector('[name=title]').value = title;
    const $content = this.$target.querySelector('[name=content]');
    $content.innerHTML = content.replace('\n', '<br>');
    focusLastChar($content);
    this.mounted();
  }

  setEvent() {
    this.addEvent({
      eventType: 'keyup',
      selector: '[name=title]',
      callback: debounceSaveLocal(({ target }) => this.saveTitle(target)),
    });
    this.addEvent({
      eventType: 'keyup',
      selector: '[name=content]',
      callback: debounceSaveLocal(({ target }) => this.saveContent(target)),
    });
    this.addEvent({
      eventType: 'click',
      selector: '[data-style]',
      callback: this.onClickStyleButton,
    });
  }

  async saveTitle(target) {
    const { value } = target;
    await PostStore.dispatch({
      actionType: 'SAVE_POST',
      payload: { title: value },
    });

    const id = PostStore.getState().post.id;
    const postLocalSaveKey = `temp-post-${id}`;

    setItem(postLocalSaveKey, PostStore.getState().post);
    await PostStore.dispatch({ actionType: 'UPDATE_POST' });
    removeItem(postLocalSaveKey);
    PostListStore.dispatch({ actionType: 'UPDATE_POST_LIST' });
  }

  async saveContent(target) {
    const { innerHTML } = target;
    await PostStore.dispatch({
      actionType: 'SAVE_POST',
      payload: { content: innerHTML },
    });

    const id = PostStore.getState().post.id;
    const postLocalSaveKey = `temp-post-${id}`;

    setItem(postLocalSaveKey, PostStore.getState().post);
    await PostStore.dispatch({ actionType: 'UPDATE_POST' });
    removeItem(postLocalSaveKey);
  }

  onClickStyleButton({ target }) {
    const { style } = target.closest('[data-style]').dataset;
    const selection = window.getSelection();
    const isNotSelected = selection.rangeCount === 0;

    if (isNotSelected) return;

    const $parent = selection.anchorNode.parentElement;
    const range = selection.getRangeAt(0);
    const $content = $parent.closest('.content');

    if (!$content || !isSafeRange(range)) return;

    function isAppliedOtherStyles($parent) {
      const styles = ['fontWeight', 'fontStyle', 'textDecoration', 'display'];
      return styles.some((style) => $parent.style[style]);
    }

    if (isApplied($parent, style)) {
      if (isAppliedOtherStyles($parent)) {
        changeStyle($parent, style);
        return;
      }
      deleteStyle(selection, range, $parent);
      return;
    }

    const $newParent = document.createElement('span');

    if (isDefaultAlign($parent, style)) return;
    if (isSpan($parent)) {
      applyStyle($parent, style);
      return;
    }

    applyStyle($newParent, style);
    range.surroundContents($newParent);
    selection.removeAllRanges();
  }
}
