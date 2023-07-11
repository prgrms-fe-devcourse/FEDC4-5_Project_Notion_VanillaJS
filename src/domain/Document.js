import { validateDomain } from "../service/domainService.js";

export default class Document {
  #allowedProperties;
  #properties;

  constructor(properties) {
    this.#allowedProperties = {
      id: "number",
      title: "string",
      content: "string",
      documents: "array",
      createdAt: "string",
      updatedAt: "string",
    };

    this.#properties = properties;

    validateDomain({
      properties: this.#properties,
      domainName: "Document",
      allowedProperties: this.#allowedProperties,
    });
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
    return this.#properties.createdAt;
  }

  get updatedAt() {
    return this.#properties.updatedAt;
  }
}
