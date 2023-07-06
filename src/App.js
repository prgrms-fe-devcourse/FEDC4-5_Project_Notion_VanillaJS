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
    let timeout;
    this.$target.innerHTML = `
      <aside id='documentTree'></aside>
      <section id='editor'></section>
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
              if (this.editor.state.content !== undefined) {
                this.saveDocumentToServer();
              }
              history.pushState(null, null, url);
              this.route();
            },
          },
          {
            action: "click",
            tag: ".addDocumentButton",
            target: "li",
            callback: ({ event, target }) => {
              if (target === null) {
                event.target.parentNode.insertBefore(
                  document.createElement("input"),
                  event.target
                );
                return;
              }
              const [, $childUl] = target.children;
              target.appendChild(document.createElement("input"));
            },
          },
          {
            action: "click",
            tag: ".deleteDocumentButton",
            target: "li",
            callback: async ({ event, target }) => {
              const { id } = target;
              await request(`/documents/${id}`, {
                method: "DELETE",
              }).then((res) => {
                removeItem("documents/" + res.id);
                history.pushState(null, null, "/");
              });
              this.updateDocumentTree();
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
                this.editor.state = this.editor.state.cloneWithNewContent({
                  content: innerHTML,
                });
              }, 500);
            },
          },
          {
            action: "blur",
            tag: ".textarea",
            target: ".textarea",
            callback: ({ event }) => {
              const { innerHTML } = event.target;

              // console.log({ ...this.editor.state, content: innerHTML });
              // this.editor.state = new Document({
              //   ...this.editor.state,
              //   content: innerHTML,
              // });
              console.log(this.editor.state);
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

  getDocumentIdByPathname() {
    const { pathname } = window.location;
    const [, , documentId] = pathname.split("/");
    return documentId;
  }

  async getDocument() {
    return await request(`/documents/${this.getDocumentIdByPathname()}`, {
      mothod: "GET",
    }).then((res) => {
      return res;
    });
  }

  saveDocumentToStorage({ content }) {
    setItem("documents/" + this.getDocumentIdByPathname(), {
      content,
      tmpSaveDate: new Date(),
    });
  }

  async saveDocumentToServer() {
    await request(`/documents/${this.getDocumentIdByPathname()}`, {
      method: "PUT",
      body: JSON.stringify({ content: this.editor.state.content }),
    }).then((res) => {});
  }

  async route() {
    const { pathname } = window.location;
    const [, routeName, documentId] = pathname.split("/");

    switch (routeName) {
      case "documents":
        const savedDocument = new Document(await this.getDocument(documentId));
        try {
          const { content, tmpSaveDate } = getItem("documents/" + documentId);
          if (tmpSaveDate > savedDocument.updatedAt) {
            if (confirm("임시저장된 데이터가 있습니다. 불러오시겠습니까?")) {
              this.editor.state = savedDocument.cloneWithNewContent({
                content,
              });
              return;
            }
          }
        } catch (error) {
          console.log(
            "임시저장된 데이터가 없습니다. 서버에서 데이터를 불러옵니다."
          );
        }

        this.editor.state = savedDocument;
        removeItem("documents/" + documentId);
        break;
    }
  }
}
