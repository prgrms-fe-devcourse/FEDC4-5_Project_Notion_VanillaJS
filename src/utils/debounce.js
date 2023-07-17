import { updateDocument } from '../apis/api.js';

export function debounce(documentId, document, onRerender) {
  let timer = null;

  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(async () => {
    await updateDocument(documentId, document);
    await onRerender();
  }, 0);
}
