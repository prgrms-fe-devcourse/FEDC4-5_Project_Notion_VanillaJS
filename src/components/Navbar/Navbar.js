import './Navbar.css';

export default class Navbar {
  constructor({
    $target,
    initialState = {
      routes: [],
    },
  }) {
    this.$target = $target;
    this.state = initialState;
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { $target } = this;
    const { routes } = this.state;

    const linkItem = ({ id, title }) => `
      <a class="navbar__link-item" href="/documents/${id}">
        ${title || '제목 없음'}
      </a>
    `;

    const slashItem = `<span class="navbar__slash-item">/</span>`

    $target.innerHTML = `${routes.map(linkItem).join(slashItem)}`;
  }
}
