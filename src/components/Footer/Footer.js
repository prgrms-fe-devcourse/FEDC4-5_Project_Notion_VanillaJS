import { history } from '@utils/router';

import Component from '@core/Component';

import './Footer.css';

export default class Footer extends Component {
  setup() {
    this.state = {
      paths: [],
    };
  }

  initComponent() {
    this.$footer = document.createElement('footer');
    this.$footer.className = 'notion-document-footer';
    this.$target.appendChild(this.$footer);
  }

  setEvent() {
    this.$footer.addEventListener('click', ({ target }) => {
      const $a = target.closest('a');
      if (!$a) return;

      const { linkId } = $a.dataset;
      if (!linkId) return;

      history.push(`/documents/${linkId}`);
    });
  }

  render() {
    const { paths } = this.state;

    if (paths.length === 0) this.$footer.innerHTML = '';

    this.$footer.innerHTML = paths
      .map(
        ({ id, title }) => `
          <a data-link-id="${id}"><span>${title}</span></a>
        `
      )
      .join('<span>&nbsp;|&nbsp;</span>');
  }
}
