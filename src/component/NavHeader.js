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
      <div class="user-tag" data-action="home">${this.state.user}</div>
      <div class="root-add" data-action="add">
        <i class="fa-solid fa-circle-plus"></i>
        <span>새 페이지</span>
      </div>
    `;
    $navHeader.classList.add("header-section");
  };

  this.render();

  $navHeader.addEventListener("click", e => {
    const action =
      e.target.dataset.action ||
      e.target.parentNode.dataset.action;
    if (action === "add") onCreate();
    else if (action === "home") onGoHome();
  });
}

export default NavHeader;
