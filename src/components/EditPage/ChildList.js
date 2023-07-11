export default class ChildList {
  constructor($target, initialState, selectDocument) {
    this.$target = $target;
    this.state = initialState;
    this.selectDocument = selectDocument;
    this.$div = null;
    this.initDiv();
    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  initDiv = () => {
    this.$div = document.createElement('div');
    this.$div.className = 'children-list-container';
    this.$target.appendChild(this.$div);
    this.addClickListEvent();
  }

  render = () => {
    if (this.state === null) {
      return;
    }
    this.$div.innerHTML = `
      ${this.state.map((element, index) => {
        return `<li data-index=${index}>${element.title}</li>`;
      }).join('')}
    `
  }

  addClickListEvent = () => {
    this.$div.addEventListener('click', (event) => {
      const $li = event.target.closest('li');
      const { index } = $li.dataset;

      this.selectDocument(this.state[index].id);
    });
  }

}