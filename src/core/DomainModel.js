export default class DomainModel {
  #properties;
  #alloewdProperties = {};

  constructor(properties) {
    this.#properties = properties;
    this.validate();
  }

  validate() {
    if (typeof properties !== "object")
      throw new Error(
        `DomainModel: properties는 object 타입이어야 합니다. 현재타입 : ${typeof properties}`
      );

    Object.keys(properties).forEach((propertie) => {
      if (!Object.keys(this.#allowedProperties).includes(propertie)) {
        throw new Error(
          `DomainModel: ${propertie} 프로퍼티는 필수로 포함되어야 합니다.`
        );
      }
    });

    Object.keys(this.#properties).forEach((propertie) => {
      if (
        typeof this.#properties.propertie !== this.#alloewdProperties.propertie
      ) {
        throw new Error(
          `DomainModel: ${propertie} 프로퍼티는 ${
            this.#alloewdProperties.propertie
          } 타입이어야 합니다. 현재타입 : ${typeof this.#properties.propertie}`
        );
      }
    });
  }
}
