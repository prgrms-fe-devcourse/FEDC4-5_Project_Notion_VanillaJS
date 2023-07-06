function Navbar({
  $page,
  initialState,
  onCreate,
  onToggle,
  onDelete,
  onSelect,
}) {
  const $navbar = document.createElement("div");
  $page.appendChild($navbar);

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { selected, documentList, toggleData } =
      this.state;
    const paintList = (documents, depth = 0) =>
      `<ul>${documents
        .map(item => {
          const isParent = item.documents.length > 0;
          const isToggled = toggleData.find(
            data => data.id == item.id
          ).toggle;
          return `<li data-id="${item.id}">
          <div class="item ${
            item.id == selected ? "selected" : ""
          }" style="--depth: ${depth}">
            <div class="btn-container item-toggle ${
              isToggled ? "toggled" : ""
            }">
              <i class="fa-solid fa-chevron-right item-toggle"></i>
            </div>
            <div class="item-title" style="--depth: ${depth}">${
            item.title.length ? item.title : "제목 없음"
          }</div>
            <div class="item-btn-group">
              <div class="btn-container item-add">
                <i class="fa-solid fa-plus item-add"></i>
              </div>
              <div class="btn-container item-delete">
                <i class="fa-solid fa-minus item-delete"></i>
              </div>
            </div>
          </div>
        ${
          isParent && isToggled
            ? paintList(item.documents, depth + 1)
            : ""
        }</li>`;
        })
        .join("")}</ul>`;
    $navbar.innerHTML = paintList(documentList);
    $navbar.classList.add("list-section");
  };

  this.render();

  $navbar.addEventListener("click", e => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    console.log(e.target.className);
    if (e.target.classList.contains("item-toggle"))
      onToggle(id);
    else if (e.target.classList.contains("item-add"))
      onCreate(id);
    else if (e.target.classList.contains("item-delete"))
      onDelete(id);
    else onSelect(id);
  });

  $navbar.addEventListener("scroll", () => {
    if ($navbar.scrollTop > 0) {
      $navbar.classList.add("scroll-shadow");
    } else {
      $navbar.classList.remove("scroll-shadow");
    }
  });
}

export default Navbar;
