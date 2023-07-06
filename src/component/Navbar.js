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
    const paintList = documents =>
      `<ul>${documents
        .map(
          item =>
            `<li data-id="${
              item.id
            }"><button type="button" name="more" ${
              item.documents.length === 0 ? "disabled" : ""
            }>more</button>
            <span>${item.title}</span>
            <button name="add" type="button"> + </button>
            <button name="delete" type="button"> - </button>
            ${
              item.documents.length > 0 &&
              toggleData.find(data => data.id == item.id)
                .toggle
                ? paintList(item.documents)
                : ""
            }</li>`
        )
        .join("")}</ul>`;
    $navbar.innerHTML = paintList(documentList);
  };

  this.render();

  $navbar.addEventListener("click", e => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;

    if (e.target.tagName === "SPAN") onSelect(id);
    else if (e.target.name === "more") onToggle(id);
    else if (e.target.name === "add") onCreate(id);
    else if (e.target.name === "delete") onDelete(id);
  });
}

export default Navbar;
