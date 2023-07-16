export default class Component {
  $parent;
  $target;
  props;
  state;

  constructor({ element = {}, props = {} }) {
    this.$parent = element.$parent;
    this.$target = element.$target;
    this.$parent.append(this.$target);
    this.props = props;
    this.state = this.props.initialState;
    this.render();
    this.addEvent();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    throw new Error("You must define and use render on the child components.");
  }

  addEvent() {}
}
