export default class DomainModel {
  #properties;
  #domainName;
  allowedProperties;

  constructor(properties, domainName) {
    this.#properties = properties;
    this.#domainName = domainName;
  }

  clone(newPropertie) {
    return new Document(Object.assign({}, this.#properties, newPropertie));
  }

  validate() {
    if (typeof this.#properties !== "object") {
      throw new Error(
        `${
          this.#domainName
        }: properties는 object 타입이어야 합니다. 현재타입 : ${typeof properties}`
      );
    }

    Object.keys(this.#properties).forEach((propertie) => {
      if (!Object.keys(this.allowedProperties).includes(propertie)) {
        throw new Error(
          `${
            this.#domainName
          }: ${propertie} 프로퍼티는 필수로 포함되어야 합니다.`
        );
      }
    });

    Object.keys(this.#properties).forEach((propertie) => {
      if (this.allowedProperties[propertie] === "array") {
        if (!Array.isArray(this.#properties[propertie])) {
          throw new Error(
            `${
              this.#domainName
            }: ${propertie} 프로퍼티는 array타입이어야 합니다. 현재타입 : ${typeof this
              .#properties[propertie]}`
          );
        }
      } else if (
        typeof this.#properties[propertie] !== this.allowedProperties[propertie]
      ) {
        throw new Error(
          `${this.#domainName}: ${propertie} 프로퍼티는 ${
            this.allowedProperties[propertie]
          } 타입이어야 합니다. 현재타입 : ${typeof this.#properties[propertie]}`
        );
      }
    });
  }
}
