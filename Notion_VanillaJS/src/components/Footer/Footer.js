import { Component } from '@/core';
import styles from './Footer.module.css';

export default class Footer extends Component {
  templates() {
    return `
  <p class=${styles.footer}>
    © 2023. Dongja rights reserved.
  </p>`;
  }
}
