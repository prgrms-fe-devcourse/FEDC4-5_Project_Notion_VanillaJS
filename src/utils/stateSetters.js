import { getRootDocuments } from "./apis";
import { CONSTRUCTOR_NAME } from "./constants";

export const stateSetters = {};

export function registerStateSetter(component) {
  const { name } = component.constructor;
  if (name && component.setState instanceof Function) {
    stateSetters[name] = (nextState) => component.setState(nextState);
  }
}

export async function patchSidebarState() {
  if (
    !Object.prototype.hasOwnProperty.call(
      stateSetters,
      CONSTRUCTOR_NAME.SIDEBAR
    )
  ) {
    return;
  }

  const rootDocuments = await getRootDocuments();
  stateSetters[CONSTRUCTOR_NAME.SIDEBAR](rootDocuments);
}
