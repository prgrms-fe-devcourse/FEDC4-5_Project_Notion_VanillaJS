import { push } from "../../utils/route.js";

export default function Home({ appElement }) {
  if (!new.target) return new Home(...arguments);

  const containerElement = document.createElement("div");

  containerElement.addEventListener("click", (e) => {
    if (e.target.closest("button")) {
      push("/document/edit");
    }
  });

  this.render = () => {
    appElement.append(containerElement);
    containerElement.innerHTML = `
      <h1>Home 입니다.</h1>
      <button class="temp">New</button>
    `;
  };
}
