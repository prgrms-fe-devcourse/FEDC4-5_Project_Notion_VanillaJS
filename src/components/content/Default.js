export default function Default({ $target }) {
  const $defaultPage = document.createElement("section");
  $defaultPage.setAttribute("id", "welcomePage");
  $target.appendChild($defaultPage);

  $defaultPage.innerHTML = `
    <div id="welcomeMessage">안녕하세요!</div>
    <div class="welcomeGuide">사이드바에서 편집할 페이지를 선택해주세요.</div>
  `;
}
