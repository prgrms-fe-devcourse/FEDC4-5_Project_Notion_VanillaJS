import {
  Component,
  DocumentTreeComponent,
  EditorComponent,
} from "./Component/index.js";
import {
  getDocumentTree,
  getDocumentIdByPathname,
  saveDocumentToServer,
  updateDocumentTree,
} from "./service/index.js";
import {
  addDocumentButtonClickEvnet,
  documentLinkClickEvent,
  deleteDocumentButtonClickEvent,
  documentInputChangeEvent,
} from "./events/index.js";
import { Document } from "./domain/index.js";
import { setItem } from "./storage/storage.js";

export default class App extends Component {
  async render() {
    let timeout;
    this.$target.innerHTML = `
      <aside id='documentTree'></aside>
      <section id='editor'></section>
    `;

    const $documentTree = this.$target.querySelector("#documentTree");
    const $editor = this.$target.querySelector("#editor");
    this.documentTree = new DocumentTreeComponent({
      $target: $documentTree,
      initialState: await getDocumentTree(),
      props: {
        events: [
          {
            action: "click",
            tag: "a",
            target: "a",
            callback: ({ target, event }) =>
              documentLinkClickEvent({
                event,
                app: this,
                component: this.editor,
                url: target.href,
              }),
          },
          {
            action: "click",
            tag: ".addDocumentButton",
            target: "li",
            callback: ({ event, target }) =>
              addDocumentButtonClickEvnet({ event, target }),
          },
          {
            action: "click",
            tag: ".deleteDocumentButton",
            target: "li",
            callback: async ({ target }) =>
              deleteDocumentButtonClickEvent({
                documentTree: this.documentTree,
                target,
              }),
          },
          {
            action: "change",
            tag: "input",
            target: "li",
            callback: async ({ event, target }) =>
              documentInputChangeEvent({
                event,
                documentTree: this.documentTree,
                target,
              }),
          },
        ],
      },
    });

    this.editor = new EditorComponent({
      $target: $editor,
      initialState: new Document({
        id: -1,
        title: "환영합니다!",
        content: "문서를 선택해주세요",
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      props: {
        events: [
          {
            action: "keyup",
            tag: ".textarea",
            target: ".textarea",
            callback: ({ target }) => {
              const { innerHTML } = target;
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                this.saveDocumentToStorage({ content: innerHTML });
              }, 200);
            },
          },
          {
            action: "keyup",
            tag: ".title",
            target: ".title",
            callback: ({ target }) => {
              const { innerHTML } = target;
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                this.saveDocumentToStorage({ title: innerHTML });
              }, 200);
            },
          },
          {
            action: "focusout",
            tag: ".title",
            target: ".title",
            callback: async ({ target }) => {
              const { innerHTML } = target;
              const newDocument = this.editor.state.cloneNewDocument({
                title: innerHTML,
              });
              this.editor.state = newDocument;
              await saveDocumentToServer({ title: newDocument.title });
              updateDocumentTree({ documentTree: this.documentTree });
            },
          },
          {
            action: "focusout",
            tag: ".textarea",
            target: ".textarea",
            callback: ({ target }) => {
              const { innerHTML } = target;
              this.editor.state = this.editor.state.cloneNewDocument({
                content: innerHTML,
              });
              if (this.editor.state.id !== -1) {
                saveDocumentToServer({ content: innerHTML });
              }
            },
          },
        ],
      },
    });
  }

  saveDocumentToStorage({ title, content }) {
    setItem("documents/" + getDocumentIdByPathname(), {
      title,
      content,
      tmpSaveDate: new Date(),
    });
  }
}
