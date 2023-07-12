import Component from '../core/Component';

export default class NotFound extends Component {
  render() {
    this.el.innerHTML = `
      <h2>그런 글이 없습니다.</h2>
      `;
    this.el.setAttribute('id', 'not-found-page');
  }
}
