export default class Store {
  #state = {};
  #listeners = {};
  #reducer;

  constructor(reducer) {
    this.#reducer = reducer;
  }

  getState() {
    return { ...this.#state };
  }

  subscribe({ listenerKey, listener }) {
    this.#listeners[listenerKey] = listener;
  }

  publish() {
    Object.values(this.#listeners).forEach((listener) => {
      console.log(listener);
      listener();
    });
  }

  async dispatch({ actionType, payload }) {
    this.#state = await this.#reducer({
      state: this.#state,
      actionType,
      payload,
    });
    this.publish();
  }
}
