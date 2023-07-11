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
import { initDocument } from "./constants.js/constants.js";

export default class App extends Component {
  async render() {
    console.log(this.props.rootPath);
    this.$target.innerHTML = `
      <aside id='documentTree'></aside>
      <section id='editor'></section>
    `;

    const $documentTree = this.$target.querySelector("#documentTree");
    const $editor = this.$target.querySelector("#editor");
    this.documentTree = new DocumentTreeComponent({
      $target: $documentTree,
      initialState: await getDocumentTree(),
      props: {},
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
            addDocumentButtonClickEvnet({
              event,
              target,
              documentTree: this.documentTree,
            }),
        },
        {
          action: "click",
          tag: ".deleteDocumentButton",
          target: "li",
          callback: async ({ target }) =>
            deleteDocumentButtonClickEvent({
              documentTree: this.documentTree,
              editor: this.editor,
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
      initialState: new Document(initDocument),
      props: {},
      events: [
        {
          action: "keyup",
          tag: ".textarea",
          target: ".textarea",
          callback: ({ target }) => {
            textareaKeyupEvent({
              title: this.editor.state.title,
              content: target.innerHTML,
            });
          },
        },
        {
          action: "keyup",
          tag: ".title",
          target: ".title",
          callback: ({ target }) => {
            titleKeyupEvent({
              title: target.innerHTML,
              content: this.state.content,
            });
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
