import URL from '@consts/url';

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
      const $a = target.closest('a');
      if (!$a) return;

      const { linkId } = $a.dataset;
      if (!linkId) return;

      const documentPath = URL.getDocumentDetailPath(linkId);
      history.push(documentPath);
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
