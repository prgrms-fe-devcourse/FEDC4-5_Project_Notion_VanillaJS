import { request } from '../utils/api.js'
import SideBar from './SideBar.js'
import Editor from './Editor.js'

export default class PostsPage {
  constructor({ $target }) {
    this.$target = $target;
    this.$page = document.createElement('div');
    this.$page.className = 'posts-page';

    this.$sideBar = new SideBar({ $target: this.$page, initialState:[] });
    this.$editor = new Editor({ $target: this.$page, initialState: {
      title: '',
      content: ''
    } });

    this.setState();
  }

  async setState() {
    // const documents = await request('/documents');
    const documents = [
      {
        "id": 1, // Document id
        "title": "노션을 만들자", // Document title
        "documents": [
          {
            "id": 2,
            "title": "블라블라",
            "documents": [
              {
                "id": 3,
                "title": "함냐함냐",
                "documents": []
              }
            ]
          }
        ]
      },
      {
        "id": 4,
        "title": "hello!",
        "documents": []
      }
    ]
    this.$sideBar.setState(documents);
    this.render();
  }

  render() {
    this.$target.appendChild(this.$page);
  }
}