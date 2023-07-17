import { Component } from '@/core';
import { Footer } from '@/components';
import styles from './NotFound.module.css';
export default class NotFound extends Component {
  templates() {
    return `<secion class =${styles.container}>
      <header class=${styles.header}>
        <h2 class=${styles.headerTitle}>요청하시는 페이지를 찾을 수 없습니다.</h2>
        <p class=${styles.headerContent}>
        입력하신 주소가 잘못 입력되었거나
        입력하신 주소가 변경 혹은 삭제 되어 요청하신 페이지를 찾을 수 없습니다<br/></p>

        <p class=${styles.headerContent}>입력하신 주소가 정확한지 다시한번 확인해 주시기 바랍니다.</p>
      </header>
      <div class='${styles.cubeWrapper} cube'>
        <div class=${styles.cubeFront}></div>
        <div class="${styles.cubeBack}"></div>
        <div class="${styles.cubeTop}"></div>
        <div class="${styles.cubeBottom}"></div>
        <div class="${styles.cubeLeft}"></div>
        <div class="${styles.cubeRight}"></div>
      </div>
      <button class='dice-button'>버튼을 눌러보세요</button>
      <footer></footer>
    </section>`;
  }

  setEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      const diceButton = target?.closest('.dice-button');
      if (!diceButton) return;

      const dice = this.$target.querySelector('.cube');
      dice.style.transform = `rotate3d(${Math.random()},${Math.random()},${Math.random()},${Math.floor(
        Math.random() * 360
      )}deg)`;
    });
  }

  mounted() {
    const $footer = this.$target.querySelector('footer');
    Component.attach({
      constructor: Footer,
      $target: $footer,
    });
  }
}
