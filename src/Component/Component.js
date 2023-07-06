export default class Component {
  #$target;
  #state;
  #events;

  constructor({ $target, initialState = {}, events = [] }) {
    this.#$target = $target;
    this.#state = initialState;
    this.#events = events;
    this.setEvent(this.#events);
    this.render();
  }

  setEvent(events) {
    if (events) events.forEach((event) => this.setEventDelegation(event));
  }

  render() {}

  setEventDelegation({ action, tag, target, callback }) {
    this.#$target.addEventListener(action, (event) => {
      if (event.target.closest(`${tag}`)) {
        callback({ event, target: event.target.closest(`${target}`) });
      }
    });
  }

  get state() {
    return this.#state;
  }

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  get $target() {
    return this.#$target;
  }
}
