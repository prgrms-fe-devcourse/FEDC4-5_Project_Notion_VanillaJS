export default class DocumentList {
  constructor({ targetEl, initialState }) {
    this.targetEl = targetEl;
    this.state = initialState;

    this.DocumentListEl = document.createElement("div");
    this.targetEl.appendChild(this.DocumentListEl);
    this.render();
  }

  render() {
    this.DocumentListEl.innerHTML = `
    <ul>
    ${this.state
      .map(
        ({ title }) =>
          `
          <li>${title}</li>
      `
      )
      .join("")}
    </ul>
    `;
  }
}
