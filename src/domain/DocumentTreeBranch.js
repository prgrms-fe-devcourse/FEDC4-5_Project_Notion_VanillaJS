import DomainModel from "../core/DomainModel.js";

export default class DocumentTreeBranch extends DomainModel {
  allowedProperties;

  constructor(properties) {
    super(properties, "DocumentTreeBranch");
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
    return this._properties.id;
  }

  get title() {
    return this._properties.title;
  }

  get documents() {
    return this._properties.documents;
  }

  set documents(documents) {
    this._properties.documents = documents;
  }
}
