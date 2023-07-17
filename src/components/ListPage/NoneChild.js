export default class NoneChild {
  constructor($target, depth) {
    this.$target = $target;
    this.depth = depth;
    this.$li = null;
    this.initLi();
    this.render();
  }

  initLi = () => {
    this.$li = document.createElement('li');
    this.$li.className = `no-child-li depth-0${this.depth}`;
    this.$target.appendChild(this.$li);
  };

  render = () => {
    this.$li.innerHTML = '<span>하위 페이지 없음</span>';
  };
}
