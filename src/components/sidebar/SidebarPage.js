import DocumentList from "./DocumentList.js";
import DocumentAddBtn from "./DocumnetAddBtn.js";
import store from "../../util/Store.js";

export default class SidebarPage {
  constructor({ $target }) {
    this.$documentPage = document.createElement("setion");
    $target.appendChild(this.$documentPage);
    this.render();
  }

  render() {
    const { $documentPage } = this;

    const documentList = new DocumentList({
      $target: $documentPage,
    });

    new DocumentAddBtn({
      $target: $documentPage,
      sendCreateFolderRequest: async (post) => {
        await sidebarStore.documentProduce(post);
        documentList.setState(sidebarStore.state.documentsTree);
      },
    });
  }
}
