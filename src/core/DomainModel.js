export default class DomainModel {
  #properties;
  alloewdProperties;

  constructor(properties) {
    this.#properties = properties;
  }

  validate() {
    if (typeof this.#properties !== "object") {
      throw new Error(
        `DomainModel: properties는 object 타입이어야 합니다. 현재타입 : ${typeof properties}`
      );
    }

    Object.keys(this.#properties).forEach((propertie) => {
      if (!Object.keys(this.alloewdProperties).includes(propertie)) {
        throw new Error(
          `DomainModel: ${propertie} 프로퍼티는 필수로 포함되어야 합니다.`
        );
      }
    });

    Object.keys(this.#properties).forEach((propertie) => {
      if (this.alloewdProperties[propertie] === "array") {
        if (!Array.isArray(this.#properties[propertie])) {
          throw new Error(
            console.log()`DomainModel: ${propertie} 프로퍼티는 array타입이어야 합니다. 현재타입 : ${typeof this
              .#properties[propertie]}`
          );
        }
      } else if (
        typeof this.#properties[propertie] !== this.alloewdProperties[propertie]
      ) {
        throw new Error(
          `DomainModel: ${propertie} 프로퍼티는 ${
            this.alloewdProperties[propertie]
          } 타입이어야 합니다. 현재타입 : ${typeof this.#properties[propertie]}`
        );
      }
    });
  }
}
