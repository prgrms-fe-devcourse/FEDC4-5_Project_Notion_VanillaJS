export default class Component {
  $parent;
  $target;
  props;
  state;

  constructor({ element = {}, props = {} }) {
    this.$parent = element.$parent;
    this.$target = element.$target;
    this.$target.className = element.className;
    this.$parent.append(this.$target);
    this.props = props;
    this.state = props.initialState;
    this.render();
    this.addEvent();
  }

  render() {}

  addEvent() {}
}
