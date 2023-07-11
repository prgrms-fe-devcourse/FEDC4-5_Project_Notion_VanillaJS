import { deepCopy } from "../utils/deepCopy.js";

export const validateDomain = ({
  properties,
  domainName,
  allowedProperties,
}) => {
  if (typeof properties !== "object") {
    throw new Error(
      `${domainName}: properties는 object 타입이어야 합니다. 현재타입 : ${typeof properties}`
    );
  }
  Object.keys(properties).forEach((propertie) => {
    if (!Object.keys(allowedProperties).includes(propertie)) {
      throw new Error(
        `${domainName}: ${propertie} 프로퍼티는 필수로 포함되어야 합니다.`
      );
    }
  });

  Object.keys(properties).forEach((propertie) => {
    if (allowedProperties[propertie] === "array") {
      if (!Array.isArray(properties[propertie])) {
        throw new Error(
          `${domainName}: ${propertie} 프로퍼티는 array타입이어야 합니다. 현재타입 : ${typeof properties[
            propertie
          ]}`
        );
      }
    } else if (typeof properties[propertie] !== allowedProperties[propertie]) {
      throw new Error(
        `${domainName}: ${propertie} 프로퍼티는 ${
          allowedProperties[propertie]
        } 타입이어야 합니다. 현재타입 : ${typeof properties[propertie]}`
      );
    }
  });
};

export const cloneDomain = ({ domain, newPropertie }) => {
  const clonedDomain = deepCopy(domain);
  return Object.assign(clonedDomain, newPropertie);
};
