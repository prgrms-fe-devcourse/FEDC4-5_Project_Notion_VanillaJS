import { push } from '../../utils/router.js';

export default function Breadcrumb({ $parent, initialState }) {
  this.state = initialState;

  const $breadcrumb = document.createElement('div');
  $breadcrumb.classList.add('breadcrumb');
  $parent.appendChild($breadcrumb);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const createBreadCrumb = () => {
    const breadcrumb = [];
    if (this.state.id) {
      let currentList = document.querySelector(
        `li[data-id='${this.state.id}']`,
      );
      while (currentList !== null) {
        const breadScrumbData = {};
        breadScrumbData.id = currentList.dataset.id;
        breadScrumbData.title = currentList.querySelector('p').textContent;
        breadcrumb.push(breadScrumbData);
        currentList = currentList.parentElement.closest('li[data-id]');
      }
    }
    return breadcrumb.reverse();
  };

  this.render = () => {
    $breadcrumb.innerHTML = `${
      this.state.id
        ? createBreadCrumb()
            .map(
              doc => `
                <div data-id=${doc.id} class='breadcrumb-title'>${doc.title}</div>
                  `,
            )
            .join('/')
        : ''
    }
    `;
  };

  $breadcrumb.addEventListener('click', e => {
    if (e.target.closest('[data-id]').dataset.id !== this.state.id) {
      push(`/documents/${e.target.closest('[data-id]').dataset.id}`);
    }
  });
}
