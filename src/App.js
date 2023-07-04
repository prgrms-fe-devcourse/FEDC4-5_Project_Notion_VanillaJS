import Button from "./Button";
import DocumentContent from "./DocumentContent";
import DocumentList from "./DocumentList";
import { request } from "./api.js";

export default class App {
  constructor() {
    this.appEl = document.querySelector("#app");

    this.render();
  }

  render() {
    this.button = new Button({
      parentEl: this.appEl,
      onButtonClick: async () => {
        const { id } = await request.addDocumentItem(0);
        history.pushState(null, null, `/${id}`);
        this.documentContent.setState(await request.getDocumentItem(id));
        // 현재 데이터에서 isSpread가 true인 id를 results 배열에 넣는다.
        const prevState = structuredClone(this.documentList.state);

        const stack = prevState;
        const results = [];
        // 트리 순회
        while (stack.length) {
          const currentNode = stack.pop();

          if (currentNode.isSpread) {
            results.push(currentNode.id);
          }

          for (let i = 0; i < currentNode.documents.length; i++) {
            stack.push(currentNode.documents[i]);
          }
        }

        const nextState = await request.getDocumentList();
        const stack2 = [...nextState];

        while (stack2.length) {
          const currentNode = stack2.pop();
          if (results.includes(currentNode.id)) {
            currentNode.isSpread = true;
          }

          const documents = [...currentNode.documents];
          for (let i = 0; i < documents.length; i++) {
            stack2.push(documents[i]);
          }
        }

        this.documentList.setState(nextState);
      },
      text: "페이지 추가하기",
    });
    this.documentList = new DocumentList({
      parentEl: this.appEl,
      onMovePageSpanClick: async (e) => {
        const {
          currentTarget: { id },
        } = e;
        history.pushState(null, null, `/${id}`);
        this.documentContent.setState(await request.getDocumentItem(id));
      },
      onAddSubPageButtonClick: async (e) => {
        const {
          currentTarget: { parentNode },
        } = e;
        const { id } = await request.addDocumentItem(parentNode.id.slice(3));

        history.pushState(null, null, `/${id}`);
        this.documentContent.setState(await request.getDocumentItem(id));

        // 현재 데이터에서 isSpread가 true인 id를 results 배열에 넣는다.
        const prevState = structuredClone(this.documentList.state);

        const stack = prevState;
        const results = [];
        // 트리 순회
        while (stack.length) {
          const currentNode = stack.pop();

          if (currentNode.isSpread) {
            results.push(currentNode.id);
          }

          for (let i = 0; i < currentNode.documents.length; i++) {
            stack.push(currentNode.documents[i]);
          }
        }

        const nextState = await request.getDocumentList();
        const stack2 = [...nextState];

        while (stack2.length) {
          const currentNode = stack2.pop();
          if (results.includes(currentNode.id)) {
            currentNode.isSpread = true;
          }

          const documents = [...currentNode.documents];
          for (let i = 0; i < documents.length; i++) {
            stack2.push(documents[i]);
          }
        }

        this.documentList.setState(nextState);
      },
      onRemoveSubPageButtonClick: async (e) => {
        const id = e.currentTarget.id;
        await request.deleteDocumentItem(id);
        // 현재 데이터에서 isSpread가 true인 id를 results 배열에 넣는다.
        const prevState = structuredClone(this.documentList.state);

        const stack = prevState;
        const results = [];
        // 트리 순회
        while (stack.length) {
          const currentNode = stack.pop();

          if (currentNode.isSpread) {
            results.push(currentNode.id);
          }

          for (let i = 0; i < currentNode.documents.length; i++) {
            stack.push(currentNode.documents[i]);
          }
        }

        const nextState = await request.getDocumentList();
        const stack2 = [...nextState];

        while (stack2.length) {
          const currentNode = stack2.pop();
          if (results.includes(currentNode.id)) {
            currentNode.isSpread = true;
          }

          const documents = [...currentNode.documents];
          for (let i = 0; i < documents.length; i++) {
            stack2.push(documents[i]);
          }
        }

        this.documentList.setState(nextState);
      },
      onToggleSubPageButtonClick: (e) => {
        const id = e.currentTarget.id;
        const stack = [...this.documentList.state];

        while (stack.length) {
          const current = stack.pop();
          if (current.id == id) {
            current.isSpread = !current.isSpread;
          }
          const documents = [...current.documents];
          for (let i = 0; i < documents.length; i++) {
            stack.push(current.documents[i]);
          }
        }
        this.documentList.setState(this.documentList.state);
      },
    });
    this.documentContent = new DocumentContent({
      parentEl: this.appEl,
      onTextChange: (e) => {
        const { pathname } = location;
        let id = pathname.slice(1);

        const { name, value } = e.currentTarget;

        this.documentContent.state = {
          ...this.documentContent.state,
          [name]: value,
        };
        if (this.documentContent.timer !== null) {
          clearTimeout(this.documentContent.timer);
        }
        this.documentContent.timer = setTimeout(async () => {
          await request.updateDocumentItem(id, this.documentContent.state);

          // 현재 데이터에서 isSpread가 true인 id를 results 배열에 넣는다.
          const prevState = structuredClone(this.documentList.state);

          const stack = prevState;
          const results = [];
          // 트리 순회
          while (stack.length) {
            const currentNode = stack.pop();

            if (currentNode.isSpread) {
              results.push(currentNode.id);
            }

            for (let i = 0; i < currentNode.documents.length; i++) {
              stack.push(currentNode.documents[i]);
            }
          }

          const nextState = await request.getDocumentList();
          const stack2 = [...nextState];

          while (stack2.length) {
            const currentNode = stack2.pop();
            if (results.includes(currentNode.id)) {
              currentNode.isSpread = true;
            }

            const documents = [...currentNode.documents];
            for (let i = 0; i < documents.length; i++) {
              stack2.push(documents[i]);
            }
          }

          this.documentList.setState(nextState);

          this.documentList.setState(nextState);
        }, 1500);
      },
    });
  }
}
