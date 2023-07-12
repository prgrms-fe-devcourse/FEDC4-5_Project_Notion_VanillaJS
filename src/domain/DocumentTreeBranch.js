import { validateDomain } from "../service/domainService.js";

export default class DocumentTreeBranch {
  #allowedProperties;
  #properties;
  constructor(properties) {
    this.#allowedProperties = {
      id: "number",
      title: "string",
      documents: "array",
      createdAt: "string",
      updatedAt: "string",
    };

    this.#properties = properties;

    validateDomain({
      properties: this.#properties,
      domainName: "DocumentTreeBranch",
      allowedProperties: this.#allowedProperties,
    });
  }

  get id() {
    return this.#properties.id;
  }

  get title() {
    return this.#properties.title;
  }

  get documents() {
    return this.#properties.documents;
  }

  set documents(documents) {
    this.#properties.documents = documents;
  }

  get properties() {
    return this.#properties;
  }
}
