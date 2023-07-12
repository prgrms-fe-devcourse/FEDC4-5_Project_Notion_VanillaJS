import Component from "./core/Component.js";
import { DocumentTreeComponent, EditorComponent } from "./Component/index.js";
import { getDocumentTree } from "./service/index.js";
import {
  addDocumentButtonClickEvent,
  documentLinkClickEvent,
  deleteDocumentButtonClickEvent,
  documentInputChangeEvent,
  textareaKeyupEvent,
  titleKeyupEvent,
  titleFocusoutEvent,
  textareaFocusoutEvent,
} from "./events/index.js";
import { hashRouter } from "./router/hashRouter.js";
import { getDocument, getRecentDocument } from "./service/documentService.js";

export default class App extends Component {
  mount() {
    hashRouter.observe(async () => {
      this.editor.state = await getRecentDocument();
    });
  }

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
      props: {},
      events: [
        {
          action: "click",
          tag: "a",
          target: "li",
          callback: ({ target, event }) => {
            documentLinkClickEvent({
              url: target.id,
              event,
            });
          },
        },
        {
          action: "click",
          tag: ".addDocumentButton",
          target: "li",
          callback: ({ event, target }) =>
            addDocumentButtonClickEvent({
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
      initialState: await getDocument(),
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
