export default class DocumentTree {
  #documentTree;

  constructor(documentTree = []) {
    this.#documentTree = documentTree;
  }

  get documentTree() {
    return this.#documentTree;
  }
}
