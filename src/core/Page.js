export default class Page {
  $parent;
  $target;
  props;

  constructor({ element = {}, props = {} }) {
    this.$parent = element.$parent;
    this.$target = element.$target;
    this.props = props;
  }

  async reload() {
    throw new Error("You must define and use reload on the child pages.");
  }

  render() {
    this.$parent.append(this.$target);
  }
}
