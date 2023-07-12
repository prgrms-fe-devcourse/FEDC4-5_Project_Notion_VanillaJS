import { validateDomain } from "../service/domainService.js";

export default class DocumentTree {
  #allowedProperties;
  #properties;

  constructor(properties) {
    this.#allowedProperties = { documentTree: "array", isInput: "boolean" };
    this.#properties = properties;

    validateDomain({
      properties: this.#properties,
      domainName: "DocumentTree",
      allowedProperties: this.#allowedProperties,
    });
  }

  get documentTree() {
    return this.#properties.documentTree;
  }

  get properties() {
    return this.#properties;
  }
}
