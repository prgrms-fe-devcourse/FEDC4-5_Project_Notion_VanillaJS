import Button from "./Button.js";

export default function DocumentHeader({ $target, name, onClick }) {
  const $header = document.createElement("header");
  $target.appendChild($header);

  const button = new Button({
    $target: $header,
    onClick, // 그대로 전달
    name: "버튼!",
  });
  this.render = () => {
    $header.innerHTML = `
    <h1>${name}의 Notion</h1>
    <button>안녕!</button>
    `;

    // 재랜더링 될 때 마다 onClick실행!
    const $button = $header.querySelector("button");
    $button.addEventListener("click", async () => {
      await onClick();
    });
  };
}
