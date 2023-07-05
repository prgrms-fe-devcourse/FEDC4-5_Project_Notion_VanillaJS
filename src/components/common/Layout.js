import { PATH } from "../../constants/path.js";
import { push } from "../../utils/route.js";

export default function Layout({ parentElement }) {
  if (!new.target) return new Layout(...arguments);

  const containerElement = document.createElement("div");

  containerElement.addEventListener("click", (e) => {
    if (e.target.closest("h1")) {
      push(PATH.HOME);
    }
  });

  this.render = () => {
    parentElement.append(containerElement);
    containerElement.innerHTML = `
      <h1 class="logo">Jongtion</h1>
    `;
  };
}
