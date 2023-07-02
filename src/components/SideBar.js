export default class SideBar {
  constructor({ $target, initialState }) {
    this.state = initialState;

    this.$sideBar = document.createElement('nav');
    this.$sideBar.className = 'side-bar';
    $target.appendChild(this.$sideBar);

    this.$newPostButton = document.createElement('button');
    this.$sideBar.appendChild(this.$newPostButton);
    this.$newPostButton.textContent = '새 페이지';
    this.$newPostButton.className = 'new-post-button';

    this.$postList = document.createElement('ul');
    this.$postList.className = 'post-list';
    this.$sideBar.appendChild(this.$postList);

    this.$postList.addEventListener('click', this.handleDocumentClick.bind(this))

    this.makeList();
  }

  makeList() {
    this.$postList.innerHTML = this.render(this.state);
  }

  setState(nextState) {
    this.state = nextState;
    this.makeList();
  }

  render(documents) {
    return documents.map((document) => `
      <li data-id=${document.id} class="document ${document.documents.length > 0 ? 'has-children' : ''}">
        ${document.title}
        ${document.documents.length > 0 ? `<ul class="sub-list">${this.render(document.documents)}</ul>` : ''}
        </li>
    `).join('');
  }

  handleDocumentClick(event) {
    const { target } = event;
    const documentElement = target.closest('.document');
    if (documentElement.classList.contains('has-children')) {
      const childList = documentElement.querySelector('.sub-list');
      if (childList) {
        childList.classList.toggle('visible');
      }
    }
  }
}