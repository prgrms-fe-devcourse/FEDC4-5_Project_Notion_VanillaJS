import {
  Component,
  DocumentTreeComponent,
  EditorComponent,
} from "./Component/index.js";
import { DocumentTree, Document } from "./domain/index.js";
import { request } from "./api.js";
import { getItem, setItem, removeItem } from "./storage/storage.js";

export default class App extends Component {
  async render() {
    this.$target.innerHTML = `
      <aside id='documentTree'></aside>
      <section id='editor'>편집하는 곳</section>
    `;

    const $documentTree = this.$target.querySelector("#documentTree");
    const $editor = this.$target.querySelector("#editor");
    this.documentTree = new DocumentTreeComponent({
      $target: $documentTree,
      initialState: await this.getDocumentTree(),
      props: {
        events: [
          {
            action: "click",
            tag: "a",
            target: "a",
            callback: async ({ event }) => {
              event.preventDefault();
              const url = event.target.href;
              const urlSplit = url.split("/");
              const targetId = urlSplit[urlSplit.length - 1];
              history.pushState(null, null, url);
              await request("/documents/" + targetId, {
                method: "GET",
              }).then((res) => this.route({ savedDocument: res }));
            },
          },
          {
            action: "click",
            tag: "#addDocumentButton",
            target: "li",
            callback: ({ event, target }) => {
              if (target === null) {
                event.target.parentNode.insertBefore(
                  document.createElement("input"),
                  event.target
                );
                return;
              }
              const [, , $childUl] = target.children;
              target.insertBefore(document.createElement("input"), $childUl);
            },
          },
          {
            action: "click",
            tag: "#deleteDocumentButton",
            target: "li",
            callback: async ({ event, target }) => {
              const { id } = target;
              await request(`/documents/${id}`, {
                method: "DELETE",
              }).then((res) => {
                removeItem("documents/" + res.id);
                history.pushState(null, null, "/");
              });
              updateDocumentTree();
            },
          },
          {
            action: "change",
            tag: "input",
            target: "li",
            callback: async ({ event, target }) => {
              const { value } = event.target;

              await request("/documents", {
                method: "POST",
                body: JSON.stringify({
                  title: value,
                  parent: target ? target.id : null,
                }),
              });

              this.updateDocumentTree();
            },
          },
        ],
      },
    });

    this.editor = new EditorComponent({
      $target: $editor,
      initialState: [],
      props: {
        events: [
          {
            action: "keyup",
            tag: "div",
            target: "div",
            callback: ({ target }) => {
              const { innerHTML } = target;
              const { pathname } = window.location;
              const [, , documentId] = pathname.split("/");
              setItem("documents/" + documentId, {
                ...this.editor.state,
                content: innerHTML,
                tmpSaveDate: new Date(),
              });
            },
          },
          {
            action: "click",
            tag: "button",
            target: "div",
            callback: async ({ target }) => {
              console.log(this.editor.state);
              await request(
                `/documents/${target.children.textarea.dataset.id}`,
                {
                  method: "PUT",
                  body: JSON.stringify(this.editor.state),
                }
              ).then((res) => {
                alert("저장되었습니다.");
                console.log(res.id);
                removeItem("documents/" + res.id);
              });
            },
          },
        ],
      },
    });
  }

  async getDocumentTree() {
    const documentTree = await request("/documents", {
      mothod: "GET",
    }).then((res) => {
      return new DocumentTree(res);
    });
    return documentTree.data;
  }

  async updateDocumentTree() {
    const documentTreeData = await request("/documents", { mothod: "GET" });
    const documentTree = new DocumentTree(documentTreeData);
    this.documentTree.state = documentTree.data;
  }

  async route(props) {
    const { savedDocument } = props;
    const { pathname } = window.location;
    const [, , documentId] = pathname.split("/");
    console.log(documentId);
    const tmpDocument = getItem("documents/" + documentId);
    if (tmpDocument && tmpDocument.tmpSaveDate > savedDocument.updatedAt) {
      if (confirm("임시저장된 데이터가 있습니다. 불러오시겠습니까?")) {
        this.editor.state = tmpDocument;
        return;
      }
    }
    this.editor.state = savedDocument;
  }
}
