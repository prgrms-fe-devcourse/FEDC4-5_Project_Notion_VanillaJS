import DomainModel from "../core/DomainModel.js";

export default class DocumentTreeBranch extends DomainModel {
  #properties;
  #domainName;
  allowedProperties;

  constructor(properties) {
    super(properties, "DocumentTreeBranch");
    this.#properties = properties;
    this.allowedProperties = {
      id: "number",
      title: "string",
      documents: "array",
      createdAt: "string",
      updatedAt: "string",
    };
    this.validate();
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
}
