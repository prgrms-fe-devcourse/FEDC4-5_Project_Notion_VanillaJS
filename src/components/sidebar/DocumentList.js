import { DocumentListEditor } from "./index";
import arrowImg from "../../../public/arrowImg.svg";

export default class DocumentList {
  constructor({
    $target,
    initalState,
    sendCreateFolderRequest,
    sendDeleteFolderRequest,
  }) {
    this.$list = document.createElement("ul");
    this.$list.classList.add("document-list");
    this.state = initalState;
    this.sendCreateFolderRequest = sendCreateFolderRequest;
    this.sendDeleteFolderRequest = sendDeleteFolderRequest;

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

      if (targetDocument.classList.contains("toggle-folder")) {
        const $subfolder = targetDocument.parentNode.nextElementSibling;
        const state = $subfolder.dataset.toggle;

        if (state === "true") {
          $subfolder.style.display = "none";
          $subfolder.dataset.toggle = "false";
          targetDocument.style.transform = "rotate(-90deg)";
        } else {
          $subfolder.style.display = "";
          $subfolder.dataset.toggle = "true";
          targetDocument.style.transform = "rotate(0deg)";
        }
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
          sendCreateFolderRequest: this.sendCreateFolderRequest,
          sendDeleteFolderRequest: this.sendDeleteFolderRequest,
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
      <img class="toggle-folder" src=${arrowImg} alt="arrow.svg"/>
      ${document.title}
      </div>`;
    if (!!nextDocument) {
      string += "<ul data-toggle='true' class='document-group'>";
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
