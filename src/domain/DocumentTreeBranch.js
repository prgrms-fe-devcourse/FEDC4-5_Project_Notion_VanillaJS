export default class DocumentTreeBranch {
  #id;
  #title;
  #documents;
  #allowedProperties = ["id", "title", "documents"];

  constructor({ id, title, documents }) {
    this.#id = id;
    this.#title = title;
    this.#documents = documents;
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
  }
}
