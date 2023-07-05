import { Component } from '@/core';
import styles from './Editor.module.css';
import { setItem, removeItem } from '@/api/storage';
import { PostStore, PostListStore } from '@/store/';
import { debounceSaveLocal } from '@/utils/';

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
        <button>h1</button>
        <button>h2</button>
        <button>h3</button>
        <button data-style='bold'>
          <i class="fa-solid fa-bold"></i>
        </button>
        <button data-style='italic'>
          <i class="fa-solid fa-italic"></i>
        </button>
        <button data-style='underline'>
          <i class="fa-solid fa-underline"></i>
        </button>
        <button data-style='line-through'>
          <i class="fa-solid fa-strikethrough"></i>
        </button>
        <button data-style='start'>
          <i class="fa-solid fa-align-left"></i>
        </button>
        <button data-style='center'>
          <i class="fa-solid fa-align-center"></i>
        </button>
        <button data-style='end'>
          <i class="fa-solid fa-align-right"></i>
        </button>
      </section>
      <div name='content' class='${styles.content}' placeholder='내용을 입력하세요' contenteditable></div>
    `;
  }

  render() {
    const { isInit } = this.state;

    //초기화 안됐을 때
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
    this.focusLastChar($content);
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
      callback: ({ target }) => {
        const { style } = target.closest('[data-style]').dataset;

        const selection = window.getSelection();
        const { parentElement } = selection.anchorNode;
        const isApplied =
          (parentElement.tagName === 'SPAN' &&
            ((style === 'bold' && parentElement.style.fontWeight === 'bold') ||
              (style === 'italic' &&
                parentElement.style.fontStyle === 'italic') ||
              (style === 'underline' &&
                parentElement.style.textDecoration === 'underline'))) ||
          (style === 'line-through' &&
            parentElement.style.textDecoration === 'line-through') ||
          (style === 'start' &&
            parentElement.style.display === 'flex' &&
            parentElement.style.justifyContent === 'start') ||
          (style === 'center' &&
            parentElement.style.display === 'flex' &&
            parentElement.style.justifyContent === 'center') ||
          (style === 'end' &&
            parentElement.style.display === 'flex' &&
            parentElement.style.justifyContent === 'end');

        if (selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);

        if (isApplied) {
          // 스타일 해제
          range.selectNode(parentElement);
          const innerText = document.createTextNode(parentElement.innerText);
          range.deleteContents();
          range.insertNode(innerText);
          selection.removeAllRanges();
        } else {
          // 스타일 적용
          const span = document.createElement('span');
          if (style === 'bold') this.applyBold(span);
          if (style === 'italic') span.style.fontStyle = 'italic';
          if (style === 'underline') span.style.textDecoration = 'underline';
          if (style === 'line-through')
            span.style.textDecoration = 'line-through';
          if (['start', 'center', 'end'].includes(style)) {
            if (parentElement.style.display === 'flex') {
              parentElement.style.justifyContent = style;
              return;
            }
            span.style.display = 'flex';
            span.style.justifyContent = 'left';
          }

          range.surroundContents(span);
          selection.removeAllRanges();
        }
      },
    });
  }

  applyBold(span) {
    span.style.fontWeight = 'bold';
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

  /**
   *
   * @param {HTMLElement} $content
   * 1. range와 selection 객체를 가져온다
   */
  focusLastChar($content) {
    const range = document.createRange();
    const selection = getSelection();

    range.selectNodeContents($content);
    range.collapse();
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
