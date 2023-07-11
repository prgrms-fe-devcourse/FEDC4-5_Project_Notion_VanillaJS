export default class RootCreateButton {
  constructor($target, createDocument) {
    this.$target = $target,
    this.createDocument = createDocument;
    this.$ul = null;
    this.initUl();
    this.render();
  }

  initUl = () => {
    this.$ul = document.createElement('ul');
    this.$ul.className = 'document-ul root-create-ul';
    this.$target.appendChild(this.$ul);
    this.addListClickEvent();
  }
  
  render = () => {
    this.$ul.innerHTML = `<li class='document-li'><button>+</button>페이지 추가</li>`
  }

  addListClickEvent = () => {
    this.$ul.addEventListener('click', () => {
      this.createDocument();
    })
  }
}