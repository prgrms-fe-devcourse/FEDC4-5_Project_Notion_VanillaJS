export default class Document {
  #id;
  #title;
  #content;
  #documents;
  #createdAt;
  #updatedAt;
  #allowedProperties = [
    "#id",
    "#title",
    "#content",
    "#documents",
    "#createdAt",
    "#updatedAt",
  ];

  constructor({ id, title, content, documnets, createdAt, updatedAt }) {
    this.#id = id;
    this.#title = title;
    this.#content = content || "";
    this.#documents = documnets || [];
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.validate();
  }

  cloneNewDocument(newDocument) {
    return new Document({
      id: newDocument.id || this.#id,
      title: newDocument.title || this.#title,
      content: newDocument.content || this.#content,
      documents: newDocument.documents || this.#documents,
      createdAt: newDocument.createdAt || this.#createdAt,
      updatedAt: newDocument.updatedAt || this.#updatedAt,
    });
  }

  validate() {
    for (const propertie of this.#allowedProperties) {
      if (this.hasOwnProperty(propertie)) {
        throw new Error(`Document: 필수 프로퍼티인 ${propertie} 없습니다.`);
      }
    }

    for (const propertie in this) {
      if (!this.#allowedProperties.includes(propertie)) {
        throw new Error(
          `Document: 허용되지 않은 ${propertie} 프로퍼티가 있습니다.`
        );
      }
    }

    if (typeof this.#id !== "number") {
      throw new Error(
        `Document: id는 number 타입이어야 합니다. 현재타입 : ${typeof this.#id}`
      );
    }

    if (typeof this.#title !== "string") {
      throw new Error(
        `Document: title은 string 타입이어야 합니다. 현재 타입 : ${typeof this
          .#title}`
      );
    }

    if (typeof this.#content !== "string") {
      throw new Error(
        `Document: content는 string 타입이어야 합니다. 현재 타입 : ${typeof this
          .#content}`
      );
    }

    if (!Array.isArray(this.#documents)) {
      throw new Error(
        `Document: documents는 array 타입이어야 합니다. 현재 타입 : ${typeof this
          .#documents}`
      );
    }

    const isValidateCreatedAt = isNaN(Date.parse(this.#createdAt));
    if (isValidateCreatedAt) {
      throw new Error(`Document: createdAt이 올바르지 않은 Date형식 입니다`);
    }

    const isValidateUpdatedAt = isNaN(Date.parse(this.#updatedAt));
    if (isValidateUpdatedAt) {
      throw new Error(`Document: updatedAt이 올바르지 않은 Date형식 입니다`);
    }
  }

  get id() {
    return this.#id;
  }

  get content() {
    return this.#content;
  }

  get title() {
    return this.#title;
  }

  get documents() {
    return this.#documents;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }
}
