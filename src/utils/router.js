import { CONSTRUCTOR_NAME } from "@Utils/constants";
import { stateSetters } from "@Utils/stateSetters";
import { getDocument } from "./apis";

export default async function router({ $target }) {
  const { pathname } = window.location;

  // eslint-disable-next-line no-param-reassign
  $target.innerHTML = "";

  if (pathname === "/") {
    stateSetters[CONSTRUCTOR_NAME.HOME](null);
  } else if (pathname.indexOf("/documents/") === 0) {
    const [, , documentIdStr] = pathname.split("/");
    const documentId = parseInt(documentIdStr, 10);

    const documentData = await getDocument({ documentId });

    if (documentData) {
      stateSetters[CONSTRUCTOR_NAME.DOCUMENT](documentData);
    } else {
      routeToHome();
    }
  }

  window.dispatchEvent(new CustomEvent("route-drawer"));
}

export function routeToDocument(documentId) {
  window.history.pushState(null, null, `/documents/${documentId}`);
  window.dispatchEvent(new CustomEvent("route"));
}

export function routeToHome() {
  window.history.pushState(null, null, "/");
  window.dispatchEvent(new CustomEvent("route"));
}
