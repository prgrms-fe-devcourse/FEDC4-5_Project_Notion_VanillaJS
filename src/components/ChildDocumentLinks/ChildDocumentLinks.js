import { documentSvg } from '../../utils/svgTemplates.js';
import './ChildDocumentLinks.css';

export default class ChildDocumentLinks {
  constructor({
    $target,
    initialState = {
      documents: [],
    },
  }) {
    this.$target = $target;
    this.state = initialState;

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { documents } = this.state;

    const linkItem = ({ id, title }) => `
      <li class="child-document-links__link">
        <a href="/documents/${id}">
          <span>${documentSvg()}</span>
          <span class="child-document-links__link--text">${title || '제목 없음'}</span>
        </a>
      </li>
    `;

    this.$target.innerHTML = `${documents.map(linkItem).join('')}`;
  }
}
