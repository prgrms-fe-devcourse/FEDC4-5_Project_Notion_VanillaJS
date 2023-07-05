export default class DocumentTree {
  #documentTree;
  #allowedProperties = ["id", "title", "documents", "createdAt", "updatedAt"];

  constructor(documentTree = []) {
    this.#documentTree = documentTree;
    this.#documentTree.forEach((element) => {
      this.validate(element);
    });
  }

  validate(document) {
    for (const propertie of this.#allowedProperties) {
      if (!document.hasOwnProperty(propertie)) {
        throw new Error(`DocumentTree: 필수 프로퍼티인 ${propertie} 없습니다.`);
      }
    }

    for (const propertie in document) {
      if (!this.#allowedProperties.includes(propertie)) {
        throw new Error(
          `DocumentTree: 허용되지 않은 ${propertie} 프로퍼티가 있습니다.`
        );
      }
    }

    if (typeof document !== "object") {
      throw new Error(
        `DocumentTree: document는 object 타입이어야 합니다. 현재 타입 : ${typeof document}`
      );
    }

    if (typeof document.id !== "number") {
      throw new Error(
        `DocumentTree: id는 number 타입이어야 합니다. 현재타입 : ${typeof document.id}`
      );
    }

    if (typeof document.title !== "string") {
      throw new Error(
        `DocumentTree: title은 string 타입이어야 합니다. 현재 타입 : ${typeof document.title}`
      );
    }

    if (!Array.isArray(document.documents)) {
      throw new Error(
        `DocumentTree: documents는 array 타입이어야 합니다. 현재 타입 : ${typeof document.documents}`
      );
    }

    const validateCreatedAt = new Date(document.createdAt);
    if (validateCreatedAt.toString() === "Invalid Date") {
      throw new Error(
        `DocumentTree: createdAt이 올바르지 않은 Date형식 입니다`
      );
    }

    const validateUpdatedAt = new Date(document.updatedAt);
    if (validateUpdatedAt.toString() === "Invalid Date") {
      throw new Error(
        `DocumentTree: updatedAt이 올바르지 않은 Date형식 입니다`
      );
    }

    document.documents.forEach((childDocument) => {
      this.validate(childDocument);
    });
  }

  get data() {
    return this.#documentTree;
  }
}
