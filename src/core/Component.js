export default class Component {
  constructor(params = {}) {
    const { tagName = 'div', state = {} } = params;
    this.el = document.createElement(tagName);
    this.state = state;
    this.render();
  }

  render() {
    throw new Error('Component must be rendered using render() method.');
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
