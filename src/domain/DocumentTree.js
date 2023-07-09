import DomainModel from "../core/DomainModel.js";

export default class DocumentTree extends DomainModel {
  #properties;
  #domainName;
  allowedProperties;

  constructor(properties) {
    super(properties, "DocumentTree");
    this.#properties = properties;
    this.allowedProperties = { documentTree: "array" };
    this.validate();
  }

  get documentTree() {
    return this.#properties.documentTree;
  }
}
