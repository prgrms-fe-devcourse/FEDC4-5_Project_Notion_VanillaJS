export default class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (newState) => {
          state[key] = newState;
          this.observers[key]();
        },
      });
    }
  }

  subscribe(key, cb) {
    this.observers[key] = cb;
  }
}
