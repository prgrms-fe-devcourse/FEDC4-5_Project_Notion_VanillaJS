import { history } from '@utils/router';

import Component from '@core/Component';

import './Header.css';

export default class Header extends Component {
  setup() {
    this.state = {
      path: [],
    };
  }

  initComponent() {
    this.$header = document.createElement('header');
    this.$header.className = 'notion-document-header';
    this.$target.appendChild(this.$header);
  }

  setEvent() {
    this.$header.addEventListener('click', ({ target }) => {
      const { linkId } = target.dataset;
      if (!linkId) return;
      history.push(`/documents/${linkId}`);
    });
  }

  render() {
    const { path } = this.state;

    this.$header.innerHTML = path
      .map(
        ({ id, title }) => `
          <a data-link-id="${id}"><span>${title}</span></a>
        `
      )
      .join('<span>/</span>');
  }
}
