import Component from "./core/Component.js";
import { DocumentTreeComponent, EditorComponent } from "./Component/index.js";
import { getDocumentTree } from "./service/index.js";
import {
  addDocumentButtonClickEvnet,
  documentLinkClickEvent,
  deleteDocumentButtonClickEvent,
  documentInputChangeEvent,
  textareaKeyupEvent,
  titleKeyupEvent,
  titleFocusoutEvent,
  textareaFocusoutEvent,
} from "./events/index.js";
import { Document } from "./domain/index.js";

export default class App extends Component {
  async render() {
    this.$target.innerHTML = `
      <aside id='documentTree'></aside>
      <section id='editor'></section>
    `;

    const $documentTree = this.$target.querySelector("#documentTree");
    const $editor = this.$target.querySelector("#editor");
    this.documentTree = new DocumentTreeComponent({
      $target: $documentTree,
      initialState: await getDocumentTree(),
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
    });

    this.editor = new EditorComponent({
      $target: $editor,
      initialState: new Document({
        id: -1,
        title: "환영합니다!",
        content: "문서를 선택해주세요",
        documents: [],
        createdAt: "000-000",
        updatedAt: "000-000",
      }),
      events: [
        {
          action: "keyup",
          tag: ".textarea",
          target: ".textarea",
          callback: ({ target }) => {
            textareaKeyupEvent(target.innerHTML);
          },
        },
        {
          action: "keyup",
          tag: ".title",
          target: ".title",
          callback: ({ target }) => {
            titleKeyupEvent({ title: target.innerHTML });
          },
        },
        {
          action: "focusout",
          tag: ".title",
          target: ".title",
          callback: async ({ target }) => {
            titleFocusoutEvent({
              documentTree: this.documentTree,
              editor: this.editor,
              title: target.innerHTML,
            });
          },
        },
        {
          action: "focusout",
          tag: ".textarea",
          target: ".textarea",
          callback: ({ target }) => {
            textareaFocusoutEvent({
              editor: this.editor,
              content: target.innerHTML,
            });
          },
        },
      ],
    });
  }
}
