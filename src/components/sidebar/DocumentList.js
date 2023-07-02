import { DocumentListEditor } from "./index";

export default class DocumentList {
  constructor({ $target, initalState, onSubmit }) {
    this.$list = document.createElement("ul");
    this.$list.classList.add("document-list");
    this.state = initalState;
    this.onSubmit = onSubmit;

    this.initEvent();
    $target.appendChild(this.$list);
    this.render();
  }

  initEvent() {
    this.$list.addEventListener("click", (event) => {
      const targetDocument = event.target;
      if (targetDocument.classList.contains("select-document")) {
        console.log(targetDocument);
      }
    });

    this.$list.addEventListener("mouseover", (event) => {
      const targetDocument = event.target;

      if (targetDocument.documentListEditor) {
        targetDocument.documentListEditor.show();
        return;
      }

      if (targetDocument.matches(".select-document")) {
        const documentListEditor = new DocumentListEditor({
          $target: targetDocument,
          onSubmit: this.onSubmit,
        });

        targetDocument.documentListEditor = documentListEditor;

        targetDocument.addEventListener("mouseleave", () => {
          targetDocument.documentListEditor.hide();
        });
      }
    });
  }

  createCustomListString(document, string) {
    const nextDocument = document.documents;
    string += `<div id=${document.id} class="select-document">
      ${document.title}
      </div>`;
    if (!!nextDocument) {
      string += "<ul>";
      for (const documents of nextDocument) {
        string = this.createCustomListString(documents, string);
      }
      string += "</ul>";
    }
    return string;
  }

  render() {
    const htmlString = this.state.reduce((acc, doc) => {
      return this.createCustomListString(doc, acc);
    }, "");
    this.$list.innerHTML = htmlString;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }
}

// const post = await request("/documents");
// console.log(post);
