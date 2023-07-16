import { plusSvg } from '../../utils/svgTemplates.js';
import html from './Sidebar.html';
import template from './templates.js';
import './Sidebar.css';

export default class Sidebar {
  constructor({
    $target,
    initialState = {
      documents: [],
      openedDocuments: {},
      currentDocumentId: 0,
    },
    onNavigate,
    onAppend,
    onRemove,
    onToggleOpened,
  }) {
    this.$target = $target;
    $target.innerHTML = html;
    this.$nav = $target.querySelector('.sidebar__nav');

    this.state = initialState;
    this.onNavigate = onNavigate;
    this.onAppend = onAppend;
    this.onRemove = onRemove;
    this.onToggleOpened = onToggleOpened;

    $target.querySelector('.sidebar__footer').innerHTML = `
      ${plusSvg()}
      <span>페이지 추가</span>
    `;

    this.render();
    this.initEvents();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  initEvents() {
    const { $target } = this;

    $target.addEventListener('click', (e) => {
      const role = e.target.closest('[data-role]')?.dataset.role;
      const id = Number(e.target.closest('li')?.getAttribute('data-id'));
      if (!role) return;

      if (role === 'create') this.onAppend(null);
      else if (role === 'navigate' && !isNaN(id)) this.onNavigate(id);
      else if (role === 'append' && !isNaN(id)) this.onAppend(id);
      else if (role === 'remove' && !isNaN(id)) this.onRemove(id);
      else if (role === 'toggle-opened' && !isNaN(id)) this.onToggleOpened(id);
    });
  }

  render() {
    const { $nav } = this;
    const { documents, openedDocuments, currentDocumentId } = this.state;

    $nav.innerHTML = `${template.documentList({ depth: 1, documents, openedDocuments, currentDocumentId })}`;
  }
}
