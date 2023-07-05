export default function MainPage({ $target, initialState }) {
  const $mainPage = document.createElement("div");
  $mainPage.className = "main-page";

  this.state = initialState;

  $mainPage.innerHTML = `<div class ="main-title">${this.state}님, Notion에 오신 것을 환영합니다.</div>
           
  <div class="main-content">문서를 추가하여 작업을 시작해보세요</div>`;

  this.render = () => {
    $target.appendChild($mainPage);
  };
}
