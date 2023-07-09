import DomainModel from "../core/DomainModel.js";

export default class Document extends DomainModel {
  allowedProperties;

  constructor(properties) {
    super(properties, "Document");
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
    return this._properties.id;
  }

  get content() {
    return this._properties.content;
  }

  get title() {
    return this._properties.title;
  }

  get documents() {
    return this._properties.documents;
  }

  get createdAt() {
    return this._properties.createdAt;
  }

  get updatedAt() {
    return this._properties.updatedAt;
  }
}
