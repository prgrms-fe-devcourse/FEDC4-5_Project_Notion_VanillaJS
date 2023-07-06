export default class MockUp {
  constructor({ parentEl }) {
    this.parentEl = parentEl;
    this.currentEl = document.createElement("div");
    this.currentEl.classList.add("mock-up");
    this.parentEl.appendChild(this.currentEl);

    this.render();
  }

  template() {
    return `
      <div class="mock-up__head-container"> 
        <h1 class="mock-up__head">
          <div class="mock-up__icon">
            <i class="fa-solid fa-user"></i>
          </div>
          <div class="mock-up__text">doggopawer</span>
        </h1>
        <div></div>
      </div>
      <div> 
        <div class="mock-up__list">
          <div class="mock-up__icon">
           <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div class="mock-up__text">검색</div>
        </div>
        <div class="mock-up__list">
          <div class="mock-up__icon">
            <i class="fa-regular fa-clock"></i>
          </div>
          <div class="mock-up__text">업데이트</div>
        </div>
        <div class="mock-up__list">
          <div class="mock-up__icon">
            <i class="fa-regular fa-building"></i>
          </div>
          <div class="mock-up__text">모든 팀스페이스</div>
        </div>
        <div class="mock-up__list">
          <div class="mock-up__icon">
            <i class="fa-solid fa-gear"></i>
          </div>
          <div class="mock-up__text">설정과 멤버</div>
        </div>
        <div class="mock-up__list">
          <div class="mock-up__icon">
            <i class="fa-solid fa-circle-plus"></i>
          </div>
          <div class="mock-up__text">새 페이지</div>
        </div>
      </div>
    `;
  }

  render() {
    this.currentEl.innerHTML = this.template();
  }
}
