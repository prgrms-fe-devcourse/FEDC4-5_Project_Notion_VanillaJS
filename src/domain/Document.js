import DomainModel from "../core/DomainModel.js";

export default class Document extends DomainModel {
  #properties;
  alloewdProperties;

  constructor(properties) {
    super(properties);
    this.#properties = properties;
    this.alloewdProperties = {
      id: "number",
      title: "string",
      content: "string",
      documents: "array",
      createdAt: "string",
      updatedAt: "string",
    };
    this.validate();
  }

  cloneNewDocument(newPropertie) {
    return new Document(Object.assign({}, this.#properties, newPropertie));
  }

  get id() {
    return this.#properties.id;
  }

  get content() {
    return this.#properties.content;
  }

  get title() {
    return this.#properties.title;
  }

  get documents() {
    return this.#properties.documents;
  }

  get createdAt() {
    return this.properties.createdAt;
  }

  get updatedAt() {
    return this.properties.updatedAt;
  }
}
