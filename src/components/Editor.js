import Component from '../core/Component';
import { getItem, setItem } from '../core/Storage';
import { request } from '../api/documentAPI';
import { debounce } from '../utils/debounce';

export default class Editor extends Component {
  constructor(postId) {
    super({
      state: {
        id: postId,
        title: '불러오는 중...',
        content: '불러오는 중...',
      },
    });

    const localData = getItem(postId);
    request(`${postId}`).then((value) => {
      this.setState({ ...value });
      if (this.state.title === '제목 없음' && this.state.content === null) {
        this.setState({ title: '', content: '' });
      }
    });
    this.setState(localData);
  }

  render() {
    this.el.innerHTML = `
        <div class="editor-view">
          <input class="title" placeholder="제목 없음" value="${this.state.title}"/>
          <textarea class="content" placeholder="Input Something...">${this.state.content}</textarea>
        </div>
        `;
    this.el.setAttribute('id', 'editor-app');

    const editorViewEl = this.el.querySelector('.editor-view');
    const titleEl = this.el.querySelector('.title');
    const AUTO_SAVE_TIME_INTERVAL = 1000;

    editorViewEl.addEventListener('input', (event) => {
      const { target } = event;
      const inputCategory = target.getAttribute('class');
      const saveWritingAuto = () => {
        const currentWriting = {
          [inputCategory]: target.value,
          updatedAt: new Date(),
        };
        setItem(this.state.id, currentWriting);
        savePostOnServer(this.state.id, currentWriting);
      };
      debounce(saveWritingAuto, AUTO_SAVE_TIME_INTERVAL);
    });

    titleEl.addEventListener('keyup', (event) => {
      const { target } = event;
      document.getElementById(this.state.id).innerText = target.value;
    });

    const savePostOnServer = (id, post) => {
      const { title, content } = post;
      request(`${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          content,
        }),
      });
    };
  }
}
