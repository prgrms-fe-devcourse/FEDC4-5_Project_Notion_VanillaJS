export default function RootPage({ $parent, initialState }) {
  const $rootPage = document.createElement('div');
  $rootPage.classList.add('root-section');
  $parent.appendChild($rootPage);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.init = () => {
    $parent.appendChild($rootPage);
    this.render();
  };

  this.render = () => {
    $rootPage.innerHTML = `
            <div>노션에 오신걸 환영합니다.😎<br><br>
            왼쪽 사이드바에서 문서를 생성하거나 선택해주세요!</div>
    `;
  };
}
