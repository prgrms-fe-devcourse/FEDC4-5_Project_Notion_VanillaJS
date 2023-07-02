import DocumentList from "./DocumentList.js";
import DocumentAddBtn from "./DocumnetAddBtn.js";

export default class SidebarPage {
  constructor({ $target, documentStore }) {
    this.$documentPage = document.createElement("setion");
    $target.appendChild(this.$documentPage);
    this.documentStore = documentStore;
    this.render();
  }

  render() {
    const { $documentPage, documentStore } = this;

    const documentList = new DocumentList({
      $target: $documentPage,
      initalState: documentStore.state.documentsTree,
      onSubmit: async (post) => {
        await documentStore.documentProduce(post);
        documentList.setState(documentStore.state.documentsTree);
      },
    });

    new DocumentAddBtn({
      $target: $documentPage,
      onSubmit: async (post) => {
        await documentStore.documentProduce(post);
        documentList.setState(documentStore.state.documentsTree);
      },
    });
  }
}
