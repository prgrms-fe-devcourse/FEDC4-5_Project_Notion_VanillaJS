export class Component {
    constructor(params = {}) {
        const { tagName = "div", state = {} } = params;
        this.el = document.createElement(tagName);
        this.state = state;
        this.render();
    }
    render() {
        // 자식 클래스에서 Override
    }

    setState(newState) {
        this.state = newState;
    }
}

export class Store {
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
