import Component from '../core/Component';
import { request } from '../api/documentAPI';

export default class DocumentItem extends Component {
  constructor() {
    super({
      tagName: 'ul',
      state: {
        id: null,
        title: '제목 없음',
        isFolded: true,
      },
    });
  }

  render() {
    if (this.state.title.length === 0) {
      this.setState({ title: '제목 없음' });
    }
    this.el.innerHTML = `
        <li style="display: flex">
          <button class="showChildDocument">></button>
          <div class="documentTitleDiv">
          <a class="documentTitle" id="${this.state.id}">${this.state.title}</a>
          </div>
          <button class="createChildDocument">+</button>
          <button class="deleteDocument">-</button>
        </li>
    `;

    const documentTitleEl = this.el.querySelector('.documentTitle');
    documentTitleEl.addEventListener('click', () => {
      history.pushState(null, null, `/documents/${this.state.id}`);
      const routeEvent = new Event('route-event');
      dispatchEvent(routeEvent);
    });

    const deleteDocumentBtnEl = this.el.querySelector('.deleteDocument');
    deleteDocumentBtnEl.addEventListener('click', () => {
      request(`${this.state.id}`, {
        method: 'DELETE',
      }).then(() => {
        this.el.remove();
      });
    });

    const createChildDocumentBtnEl = this.el.querySelector(
      '.createChildDocument',
    );
    createChildDocumentBtnEl.addEventListener('click', () => {
      const res = request('', {
        method: 'POST',
        body: JSON.stringify({
          title: '제목 없음',
          parent: `${this.state.id}`,
        }),
      });
      const childDocumentItem = new DocumentItem();
      res.then((value) => {
        childDocumentItem.setState({ id: value.id, title: value.title });
        this.el.appendChild(childDocumentItem.el);
      });
    });

    const showChildDocumentBtn = this.el.querySelector('.showChildDocument');
    showChildDocumentBtn.addEventListener('click', (event) => {
      const parentTargetEl = event.target.parentElement.parentElement;
      const childDocument = this.el.querySelectorAll('.child');
      if (!childDocument) {
        return;
      }
      const displayStyle = this.state.isFolded ? 'block' : 'none';
      [...childDocument].forEach((child) => {
        if (child.parentElement === parentTargetEl) {
          child.style.display = displayStyle;
        }
      });
      this.state.isFolded = !this.state.isFolded;
    });
  }
}
