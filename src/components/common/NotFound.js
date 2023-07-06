import { PATH } from "../../constants/path.js";
import { push } from "../../utils/route.js";

export default function NotFound({ parentCompoent }) {
  const containerElement = document.createElement("div");
  containerElement.className = "not-found-container";

  containerElement.addEventListener("click", (e) => {
    if (!e.target.closest(".home-button")) return;

    push(PATH.HOME);
  });

  this.render = () => {
    parentCompoent.append(containerElement);

    containerElement.innerHTML = `
      <h2 class="not-found-title">잘못된 경로입니다!</h2>
      <button class="home-button">홈으로 이동하기</button>
    `;
  };
}
