import DomainModel from "../core/DomainModel.js";

export default class DocumentTree extends DomainModel {
  allowedProperties;

  constructor(properties) {
    super(properties, "DocumentTree");
    this.allowedProperties = { documentTree: "array", isInput: "boolean" };
    this.validate();
  }

  get documentTree() {
    return this._properties.documentTree;
  }
}
