export default class DocumentTree {
  #documentTree;

  constructor(documentTree = []) {
    this.#documentTree = documentTree;
    this.#documentTree.forEach((element) => {
      this.validate(element);
    });
  }

  validate(document) {
    if (typeof document.id !== "number") {
      throw new Error("DocumentTree: id는 number 타입이어야 합니다.");
    }

    if (typeof document.title !== "string") {
      throw new Error("DocumentTree: title은 string 타입이어야 합니다.");
    }

    if (!Array.isArray(document.documents)) {
      throw new Error("DocumentTree: documents는 array 타입이어야 합니다.");
    }

    document.documents.forEach((childDocument) => {
      this.validate(childDocument);
    });
  }

  get data() {
    return this.#documentTree;
  }
}
