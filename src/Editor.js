export default function Editor($target, onEditing) {
  const $toolbar = document.createElement("div");
  $toolbar.className = "toolbar";
  $toolbar.innerHTML = `
        <button data-command="bold">Bold</button>
        <button data-command="italic">Italic</button>
        <button data-command="justifyLeft">Align Left</button>
        <button data-command="justifyCenter">Align center</button>
        <button data-command="justifyRight">Align Right</button>
    `;
  $toolbar.addEventListener("click", (e) => {
    document.execCommand(e.target.getAttribute("data-command"));
    const $title = document.getElementsByClassName("content-title")[0];
    const $editor = document.getElementsByClassName("editor")[0];
    onEditing($title.value, $editor.innerHTML);
  });

  const $editor = document.createElement("div");
  $editor.className = "editor";
  $editor.contentEditable = true;
  $editor.name = "content";

  $target.appendChild($toolbar);
  $target.appendChild($editor);
}
