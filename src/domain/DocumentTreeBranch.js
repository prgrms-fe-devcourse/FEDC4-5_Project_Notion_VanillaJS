export default class DocumentTreeBranch {
  #id;
  #title;
  #documents;
  #createdAt;
  #updatedAt;
  #allowedProperties = ["#id", "#title", "#documents"];

  constructor({ id, title, documents, createdAt, updatedAt }) {
    this.#id = id;
    this.#title = title;
    this.#documents = documents;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.validate();
  }

  cloneNewDocumentTreeBranch(newDocumentTreeBranch) {
    return new DocumentTreeBranch({
      id: newDocumentTreeBranch.id || this.#id,
      title: newDocumentTreeBranch.title || this.#title,
      documents: newDocumentTreeBranch.documents || this.#documents,
    });
  }

  validate() {
    for (const propertie of this.#allowedProperties) {
      if (this.hasOwnProperty(propertie)) {
        throw new Error(
          `DocumentTreeBranch: 필수 프로퍼티인 ${propertie} 없습니다.`
        );
      }
    }

    for (const propertie in this) {
      if (!this.#allowedProperties.includes(propertie)) {
        throw new Error(
          `DocumentTreeBranch: 허용되지 않은 ${propertie} 프로퍼티가 있습니다.`
        );
      }
    }

    if (typeof this.#id !== "number") {
      throw new Error(
        `DocumentTreeBranch: id는 number 타입이어야 합니다. 현재타입 : ${typeof this
          .#id}`
      );
    }

    if (typeof this.#title !== "string") {
      throw new Error(
        `DocumentTreeBranch: title은 string 타입이어야 합니다. 현재 타입 : ${typeof this
          .#title}`
      );
    }

    if (!Array.isArray(this.#documents)) {
      throw new Error(
        `DocumentTreeBranch: documents는 array 타입이어야 합니다. 현재 타입 : ${typeof this
          .#documents}`
      );
    }
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get documents() {
    return this.#documents;
  }

  set documents(documents) {
    this.#documents = documents;
  }
}
