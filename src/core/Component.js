export default class Component {
  constructor(params = {}) {
    const { tagName = 'div', state = {} } = params;
    this.el = document.createElement(tagName);
    this.state = state;
    this.render();
  }

  render() {
    // 자식 클래스에서 Override
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
