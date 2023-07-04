import { Component } from '@/core';
import styles from './Home.module.css';

export default class Home extends Component {
  templates() {
    return `
    <section class= '${styles.content}'>
      <h1 class='${styles.header}'>
        <span class=${styles.purple}>D</span>ong
        <span class=${styles.purple}>J</span>a's
        <span class=${styles.purple}>N</span>otion에 오신 걸 환영합니다!</h1>
      <p class=${styles.description}>게시글을 추가, 삭제, 수정할 수 있으며<br/> 작성중인 게시글은 자동으로 저장됩니다</p>
    </section>
    <footer class = '${styles.footer}'>
      <p>© 2023. Dongja rights reserved.</p>
    </footer>
    `;
  }
}
