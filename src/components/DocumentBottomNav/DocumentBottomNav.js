import URL from '@consts/url';

import { history } from '@utils/router';

import Component from '@core/Component';

import './DocumentBottomNav.css';

export default class DocumentBottomNav extends Component {
  setup() {
    this.state = {
      paths: [],
    };
  }

  initComponent() {
    this.$bottomNav = document.createElement('footer');
    this.$bottomNav.className = 'notion-document-footer';
    this.$target.appendChild(this.$bottomNav);
  }

  setEvent() {
    this.$bottomNav.addEventListener('click', ({ target }) => {
      const $a = target.closest('a');
      if (!$a) return;

      const { linkId } = $a.dataset;
      if (!linkId) return;

      const documentPath = URL.getDocumentDetailPath(linkId);
      history.push(documentPath);
    });
  }

  render() {
    const { paths } = this.state;

    if (paths.length === 0) this.$bottomNav.innerHTML = '';

    this.$bottomNav.innerHTML = paths
      .map(
        ({ id, title }) => `
          <a data-link-id="${id}"><span>${title}</span></a>
        `
      )
      .join('<span>&nbsp;|&nbsp;</span>');
  }
}
