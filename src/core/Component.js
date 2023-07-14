export default class Component {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.setup();
    this.initComponent();
    this.initChildComponents();

    this.setEvent();
    this.render();
  }

  setup() {}

  initComponent() {}

  initChildComponents() {}

  setEvent() {}

  render() {}

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.render();
  }
}
