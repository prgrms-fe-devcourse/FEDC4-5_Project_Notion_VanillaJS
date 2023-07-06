import { request } from "../api/api.js";

const ROUTE_EVENT_NAME = "click-event-route-change";
const ROUTE_EDIT_EVENT = "edit-event-route-change";

export const editorRoute = (onRoute) => {
  window.addEventListener(ROUTE_EVENT_NAME, async (e) => {
    const { type } = e.detail;
    const { id } = e.detail;
    const { pathname } = window.location;
    const [, documentId] = pathname.split("/");

    if (type === "list" && documentId !== id) {
      if (id == null) {
        id = documentId;
      }
      history.pushState(null, null, `/${id}`);
      onRoute(null);
    } else if (type === "remove-btn") {
      if (documentId === id) {
        history.pushState(null, null, "/");
      }
      onRoute(null);
    } else if (type === "add-btn") {
      const createdDocument = await request("/", {
        method: "POST",
        body: JSON.stringify({
          title: "제목없음",
          parent: id,
        }),
      });
      history.pushState(null, null, `/${createdDocument.id}`);
      onRoute(id);
    } else if (type === "header") {
      history.pushState(null, null, "/");
      onRoute(null);
    }
  });
};

export const listRoute = (onRoute) => {
  window.addEventListener(ROUTE_EVENT_NAME, async (e) => {
    const { type } = e.detail;
    const { id } = e.detail;

    if (type === "remove-btn") {
      await request(`/${id}`, {
        method: "DELETE",
      });
    }
    onRoute();
  });
};

export const push = (element) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_EVENT_NAME, {
      detail: {
        type: element.type || null,
        id: element.id || null,
      },
    })
  );
};
