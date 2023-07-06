import { Component } from '@/core';
import { Footer } from '@/components';
import styles from './Home.module.css';
import homeImage from '@/assets/homeImage.png';

export default class Home extends Component {
  templates() {
    return `
    <section class ='${styles.container}'>
      <section class= '${styles.content}'>
        <h1 class='${styles.header}'>
          <span class=${styles.purple}>D</span>ong
          <span class=${styles.purple}>J</span>a's
          <span class=${styles.purple}>N</span>otion에 오신 걸
          <span class=${styles.pink}>환영</span>합니다!</h1>
        <section class=${styles.imageContainer}>
          <img src=${homeImage} class='${styles.homeImage}' alt='homeImage'/>
        </section>
        <p class=${styles.description}>게시글을 추가, 삭제, 수정할 수 있으며 작성중인 게시글은 자동으로 저장됩니다</p>
      </section>
      <footer></footer>
    </section>
    `;
  }

  mounted() {
    const $footer = this.$target.querySelector('footer');
    Component.attach({
      constructor: Footer,
      $target: $footer,
    });
  }
}
