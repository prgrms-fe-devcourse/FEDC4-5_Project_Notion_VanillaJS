export default function Editor({ $target, title, content, keyOn }) {
  const $editor = document.createElement("textarea");
  $target.appendChild($editor);

  $target.style.position = "relative";
  $editor.style.cssText = `
    position : absolute;
    width : 500px;
    height : 200px;
    left : 50%;
    top : 50%;
    transform : translate(-50%, -50%);
  `;
  // $editor.style.width = "500px";
  // $editor.style.height = "200px";

  this.render = () => {
    $editor.innerText = `${title}, ${content}`;
  };

  $editor.addEventListener("keyup", (e) => {
    keyOn();
  });
}
