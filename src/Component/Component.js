export default class Component {
  #$target;
  #state;
  #events;
  #allowedProperties = ["$target", "initialState", "events"];

  constructor(properties) {
    this.validate(properties);
    this.#$target = properties.$target;
    this.#state = properties.initialState;
    this.#events = properties.events;
    this.setEvent(this.#events);
    this.render();
  }

  validate(properties) {
    if (typeof properties !== "object")
      throw new Error(
        `Component: properties는 object 타입이어야 합니다. 현재타입 : ${typeof properties}`
      );

    Object.keys(properties).forEach((propertie) => {
      if (!this.#allowedProperties.includes(propertie)) {
        throw new Error(
          `Component: ${propertie} 프로퍼티는 필수로 포함되어야 합니다.`
        );
      }
    });

    const { $target, initialState, events } = properties;

    if (typeof $target !== "object") {
      throw new Error(
        `Component: $target은 object 타입이어야 합니다. 현재타입 : ${typeof $target}`
      );
    }

    if (typeof initialState !== "object") {
      throw new Error(
        `Component: initialState는 object 타입이어야 합니다. 현재타입 : ${typeof initialState}`
      );
    }

    if (!Array.isArray(events)) {
      throw new Error(
        `Component: events는 Array 타입이어야 합니다. 현재타입 : ${typeof events}`
      );
    }
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
