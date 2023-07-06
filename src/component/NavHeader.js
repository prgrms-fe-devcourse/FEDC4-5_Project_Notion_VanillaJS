function NavHeader({
  $page,
  initialState,
  onCreate,
  onGoHome,
}) {
  const $navHeader = document.createElement("div");
  $page.appendChild($navHeader);

  this.state = initialState;

  this.render = () => {
    $navHeader.innerHTML = `
      <div class="user-tag">${this.state.user}</div>
      <div class="root-add">
        <i class="fa-solid fa-circle-plus"></i>
        <span>새 페이지</span>
      </div>
    `;
    $navHeader.classList.add("header-section");
  };

  this.render();

  $navHeader.addEventListener("click", e => {
    if (e.target.className === "root-add") {
      onCreate();
    }
    if (e.target.className === "user-tag") {
      onGoHome();
    }
  });
}

export default NavHeader;
