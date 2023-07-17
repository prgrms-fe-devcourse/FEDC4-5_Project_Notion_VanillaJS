import { request } from "./api.js";

export default function modal(fetchSidebar) {
  const $modal = document.getElementById("modal");
  const $submitModal = document.getElementById("submit-modal");
  const $modalInput = document.getElementById("modal-input-title");

  let isLoading = false;

  const handleModalSubmit = () => {
    if (isLoading) return;

    const { pathname } = window.location;
    const [, , id] = pathname.split("/");
    const input = document.getElementById("modal-input-title");

    $modal.style.display = "none";
    isLoading = true;

    request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: input.value,
        parent: id,
      }),
    })
      .then(() => {
        input.value = "";
        fetchSidebar();
      })
      .finally(() => {
        isLoading = false;
      });
  };

  $submitModal.addEventListener("click", handleModalSubmit);

  $modalInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleModalSubmit();
    }
  });
}
