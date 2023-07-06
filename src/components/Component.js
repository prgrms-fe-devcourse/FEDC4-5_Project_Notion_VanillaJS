export default class Component {
  constructor({ element = {}, initialState, props = {} }) {
    this.$parent = element.$parent;
    this.$target = element.$target;
    this.$target.className = element.className;
    this.$parent.append(this.$target);
    this.state = initialState;
    this.props = props;
    this.render();
    this.addEvent();
  }

  render() {}

  addEvent() {}
}
