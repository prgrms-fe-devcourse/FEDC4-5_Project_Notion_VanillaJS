export default class Store {
  #state = {};
  #listeners = {};
  #reducer;

  constructor({ state, reducer }) {
    this.#state = state;
    this.#reducer = reducer;
  }

  getState() {
    return { ...this.#state };
  }

  subscribe({ listenerKey, listener }) {
    this.#listeners[listenerKey] = listener;
  }

  publish() {
    Object.values(this.#listeners).forEach((listener) => listener());
  }

  async dispatch({ actionType, payload }) {
    this.#state = await this.#reducer(this.#state, actionType, payload);
    this.publish();
  }
}
