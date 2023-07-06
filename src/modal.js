import { request } from "./api.js";

export default function modal(fetchSidebar) {
  const $modal = document.getElementById("modal");
  const $submitModal = document.getElementById("submit-modal");
  $submitModal.addEventListener("click", () => {
    const { pathname } = window.location;
    const [, , id] = pathname.split("/");
    $modal.style.display = "none";
    const input = document.getElementById("modal-input-title");
    request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: input.value,
        parent: id,
      }),
    }).then(() => {
      input.value = "";
      fetchSidebar();
    });
  });
}
