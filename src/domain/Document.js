import DomainModel from "../core/DomainModel.js";

export default class Document extends DomainModel {
  #properties;
  #domainName;
  allowedProperties;

  constructor(properties) {
    super(properties, "Document");
    this.#properties = properties;
    this.allowedProperties = {
      id: "number",
      title: "string",
      content: "string",
      documents: "array",
      createdAt: "string",
      updatedAt: "string",
    };
    this.validate();
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
