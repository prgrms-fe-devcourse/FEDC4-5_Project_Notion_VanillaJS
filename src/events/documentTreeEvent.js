import { route } from "../router/route.js";

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
