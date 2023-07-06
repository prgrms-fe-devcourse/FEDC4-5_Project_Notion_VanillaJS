import { request } from '../utils/api.js'
import SideBar from './SideBar.js'
import Editor from './Editor.js'

export default class PostsPage {
  constructor({ $target }) {
    this.$target = $target;
    this.$page = document.createElement('div');
    this.$page.className = 'posts-page';
    
    this.$sideBar = new SideBar({ $target: this.$page, handleDocumentClick: this.handleDocumentClick });

    this.$editor = new Editor({ $target: this.$page, initialState: {
      title: '',
      content: ''
    } });

    this.setState();
  }

  async setState() {
    const documents = await request('/documents');
    this.$sideBar.setState(documents);
    this.render();
  }

  render() {
    this.$target.appendChild(this.$page);
  }

  handleDocumentClick = (documentId) => {
    this.getDocument(documentId);
  };

  async getDocument(documentId) {
    try {
      const document = await request(`/documents/${documentId}`);
      this.$editor.setState({
        title: document.title,
        content: document.content,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}