import { fetchList, createPost, deletePost } from '../utils/api.js';

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
    this.$newPostButton.addEventListener('click', this.handleNewPostButtonClick.bind(this));

    this.handleDocumentClick = handleDocumentClick;

    this.fetchDocuments();
  }

  async fetchDocuments() {
    try {
      const documents = await fetchList();
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
      const hasChildren = document.documents.length > 0 && document.documents;
      const subList = hasChildren ? `<ul class="sub-list">${this.renderChildren(document.documents)}</ul>` : '';
      return `<li data-id="${document.id}" class="document ${hasChildren ? 'has-children' : ''}">
        ${document.title}
        ${subList}
        <span class="add-button">+</span>
        <span class="remove-button">-</span>
      </li>`;
    }).join('');

    this.$postList.querySelectorAll('.add-button').forEach(($button) => {
      $button.addEventListener('click', this.handleAddButtonClick.bind(this));
    });

    this.$postList.querySelectorAll('.remove-button').forEach(($button) => {
      $button.addEventListener('click', this.handleRemoveButtonClick.bind(this));
    });
  }

  renderChildren(documents) {
    return documents.map((document) => {
      const hasChildren = document.documents.length > 0;
      const subList = hasChildren ? `<ul class="sub-list">${this.renderChildren(document.documents)}</ul>` : '';
      return `<li data-id="${document.id}" class="document ${hasChildren ? 'has-children' : ''}">
        ${document.title}
        ${subList}
        <span class="add-button">+</span>
        <span class="remove-button">-</span>
      </li>`;
    }).join('');
  }

  handlePostClick(event) {
    const { target } = event;
    const documentId = target.dataset.id;
    const documentElement = target.closest('.document');
    if (documentElement.classList.contains('has-children')) {
      const childList = documentElement.querySelector('.sub-list');
      if (childList) {
        childList.classList.toggle('visible');
      }
    }
    if (documentId) {
      this.handleDocumentClick(documentId);
    }
  }

  async handleNewPostButtonClick(event) {
    const newPost = await createPost({
      'title': 'new post',
      'parent': null
    });
    this.setState([...this.state, {...newPost, documents:[]}]);
    this.handleDocumentClick(newPost.id)
  }

  async handleAddButtonClick(event) {
    const documentId = event.target.closest('li').dataset.id;
    const newPost = await createPost({
      'title': 'new sub post',
      'parent': documentId,
    });
    this.setState([...this.state, {...newPost, documents:[]}]);
    this.handleDocumentClick(newPost.id);
  }

  async handleRemoveButtonClick(event) {
    const documentId = event.target.closest('li').dataset.id;
    await deletePost(documentId);
    const newState = this.removeDocument(this.state, documentId);
    this.setState(newState);
  }

  removeDocument(documents, documentId) {
    return documents.filter((document) => {
      if (document.id === documentId) {
        return false;
      }
      document.documents = this.removeDocument(document.documents, documentId);
      return true;
    });
  }
}