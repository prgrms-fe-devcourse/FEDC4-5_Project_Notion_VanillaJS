export default class DocumentTree {
  #documentTree;

  constructor(documentTree = []) {
    this.#documentTree = documentTree;
    console.log(documentTree);
    this.#documentTree.forEach((element) => {
      this.validate(element);
    });
  }

  validate(document) {
    if (typeof document.id !== "number") {
      return false;
    }

    if (typeof document.title !== "string") {
      return false;
    }

    if (!Array.isArray(document.documents)) {
      return false;
    }

    document.documents.forEach((childDocument) => {
      if (!this.validate(childDocument)) {
        return false;
      }
    });

    return true;
  }

  get data() {
    return this.#documentTree;
  }
}
