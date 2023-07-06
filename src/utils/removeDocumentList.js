export const removeDiv = (className) => {
  const $pageDiv = document.querySelector(className);
  if ($pageDiv) {
    $pageDiv.remove();
  }
};
