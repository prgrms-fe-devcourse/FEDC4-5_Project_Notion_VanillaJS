import { route } from "../router/route.js";
import { removeItem } from "../storage/storage.js";
import { request } from "../api.js";

export const documentLinkClickEvent = async ({
  event,
  app,
  component,
  url,
}) => {
  event.preventDefault();
  route({ app, component, url });
};

export const addDocumentButtonClickEvnet = async ({ event, target }) => {
  const $input = document.createElement("input");
  $input.placeholder = "제목";
  $input.className = "documentInput";
  if (target === null) {
    event.target.parentNode.insertBefore($input, event.target);
    return;
  }
  target.appendChild($input);
};

export const deleteDocumentButtonClickEvent = async ({ app, target }) => {
  const { id } = target;
  await request(`/documents/${id}`, {
    method: "DELETE",
  }).then((res) => {
    removeItem("documents/" + res.id);
    history.pushState(null, null, "/");
  });
  app.updateDocumentTree();
};

export const documentInputChangeEvent = async ({ event, app, target }) => {
  const { value } = event.target;
  await request("/documents", {
    method: "POST",
    body: JSON.stringify({
      title: value,
      parent: target ? target.id : null,
    }),
  });

  app.updateDocumentTree();
};
