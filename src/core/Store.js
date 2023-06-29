export default class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (newState) => {
          state[key] = newState;
          this.observers[key](); // 지정된 콜백 함수 실행.
        },
      });
    }
  }
  // 상태 변경을 감지. 감시하는 상태에 대해 넘겨 받은 콜백 함수 지정.
  subscribe(key, cb) {
    this.observers[key] = cb;
  }
}
