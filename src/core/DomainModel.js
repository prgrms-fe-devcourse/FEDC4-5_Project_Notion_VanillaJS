export default class DomainModel {
  _properties;
  _domainName;
  allowedProperties;

  constructor(properties, domainName) {
    this._properties = properties;
    this._domainName = domainName;
  }

  clone(newPropertie) {
    return Object.assign({}, this._properties, newPropertie);
  }

  validate() {
    if (typeof this._properties !== "object") {
      throw new Error(
        `${
          this._domainName
        }: properties는 object 타입이어야 합니다. 현재타입 : ${typeof properties}`
      );
    }

    Object.keys(this._properties).forEach((propertie) => {
      if (!Object.keys(this.allowedProperties).includes(propertie)) {
        throw new Error(
          `${this._domainName}: ${propertie} 프로퍼티는 필수로 포함되어야 합니다.`
        );
      }
    });

    Object.keys(this._properties).forEach((propertie) => {
      if (this.allowedProperties[propertie] === "array") {
        if (!Array.isArray(this._properties[propertie])) {
          throw new Error(
            `${
              this._domainName
            }: ${propertie} 프로퍼티는 array타입이어야 합니다. 현재타입 : ${typeof this
              ._properties[propertie]}`
          );
        }
      } else if (
        typeof this._properties[propertie] !== this.allowedProperties[propertie]
      ) {
        throw new Error(
          `${this._domainName}: ${propertie} 프로퍼티는 ${
            this.allowedProperties[propertie]
          } 타입이어야 합니다. 현재타입 : ${typeof this._properties[propertie]}`
        );
      }
    });
  }
}
