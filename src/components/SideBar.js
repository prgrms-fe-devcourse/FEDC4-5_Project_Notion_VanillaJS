import { get } from '../utils/api.js';

export default class SideBar {
  constructor({ $target, handleDocumentClick }) {
    this.state = [];
    this.$target = $target;
    this.$sideBar = document.createElement('nav');
    this.$sideBar.className = 'side-bar';
    this.$target.appendChild(this.$sideBar);

    this.$newPostButton = document.createElement('button');
    this.$newPostButton.textContent = '새 페이지';
    this.$newPostButton.className = 'new-post-button';
    this.$sideBar.appendChild(this.$newPostButton);

    this.$postList = document.createElement('ul');
    this.$postList.className = 'post-list';
    this.$sideBar.appendChild(this.$postList);

    this.$postList.addEventListener('click', this.handlePostClick.bind(this));

    this.handleDocumentClick = handleDocumentClick;

    this.fetchDocuments();
  }

  async fetchDocuments() {
    try {
      const documents = await get('/documents');
      this.setState(documents);
    } catch (error) {
      console.log(error.message);
    }
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$postList.innerHTML = this.state.map((document) => {
      const hasChildren = document.documents.length > 0;
      const subList = hasChildren ? `<ul class="sub-list">${this.renderChildren(document.documents)}</ul>` : '';
      return `<li data-id="${document.id}" class="document ${hasChildren ? 'has-children' : ''}">
                ${document.title}
                ${subList}
              </li>`;
    }).join('');
  }

  renderChildren(documents) {
    return documents.map((document) => {
      const hasChildren = document.documents.length > 0;
      const subList = hasChildren ? `<ul class="sub-list">${this.renderChildren(document.documents)}</ul>` : '';
      return `<li data-id="${document.id}" class="document ${hasChildren ? 'has-children' : ''}">
                ${document.title}
                ${subList}
              </li>`;
    }).join('');
  }

  handlePostClick(event) {
    const { target } = event;
    const documentId = target.dataset.id;
    this.handleDocumentClick(documentId);

    const documentElement = target.closest('.document');
    if (documentElement.classList.contains('has-children')) {
      const childList = documentElement.querySelector('.sub-list');
      if (childList) {
        childList.classList.toggle('visible');
      }
    }
  }
}