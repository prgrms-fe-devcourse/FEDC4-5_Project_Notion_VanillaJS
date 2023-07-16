import { CONSTRUCTOR_NAME, EVENT } from "@Utils/constants";
import { setStateOf } from "@Utils/stateSetters";
import { getDocument } from "./apis";

export default async function router({ $target }) {
  const { pathname } = window.location;

  // eslint-disable-next-line no-param-reassign
  $target.innerHTML = "";

  if (pathname === "/") {
    setStateOf(CONSTRUCTOR_NAME.HOME, null);
  } else if (pathname.indexOf("/documents/") === 0) {
    const [, , documentIdStr] = pathname.split("/");
    const documentId = parseInt(documentIdStr, 10);

    const documentData = await getDocument({ documentId });

    if (documentData) {
      setStateOf(CONSTRUCTOR_NAME.DOCUMENT, documentData);
    } else {
      routeToHome();
    }
  }

  window.dispatchEvent(new CustomEvent(EVENT.ROUTE_DRAWER));
}

export function routeToDocument(documentId) {
  window.history.pushState(null, null, `/documents/${documentId}`);
  window.dispatchEvent(new CustomEvent(EVENT.ROUTE));
}

export function routeToHome() {
  window.history.pushState(null, null, "/");
  window.dispatchEvent(new CustomEvent(EVENT.ROUTE));
}
