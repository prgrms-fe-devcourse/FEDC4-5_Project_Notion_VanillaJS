import DocumentList from "./DocumentList";

export default class App {
  constructor({ targetEl, initialState }) {
    this.targetEl = targetEl;
    this.state = initialState;
    console.log(this.state);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    new DocumentList({
      targetEl: this.targetEl,
      initialState: this.state,
    });
  }
}
