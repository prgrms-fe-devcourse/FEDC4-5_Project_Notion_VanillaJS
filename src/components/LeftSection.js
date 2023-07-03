class LeftSection {
  constructor({ $target, initialState, onClick }) {
    this.$target = $target;
    this.state = initialState;
    this.onClick = onClick;

    this.$leftSection = document.createElement("section");
    this.$leftSection.className = "left-section";
    this.$target.appendChild(this.$leftSection);

    this.addEvent(this.$leftSection);
    this.render();
  }

  addEvent = ($target) => {
    $target.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.className.includes("doc-item")) {
        const { href } = e.target;
        const pathname = href.replace(window.location.origin, "");
        history.pushState(null, null, pathname);

        this.onClick();
      }
    });

    window.addEventListener("popstate", () => this.onClick());
  };

  createDocumentList(data, depth = 0) {
    const html = data
      .map((doc) => {
        let subDocuments = "";
        if (doc.documents && doc.documents.length > 0) {
          subDocuments = this.createDocumentList(doc.documents, depth + 1);
        }
        const styleByDepth = `depth-${depth}`;
        return `<div><a href="/${doc.id}" class="doc-item ${styleByDepth}">${doc.title}</a>${subDocuments}</div>`;
      })
      .join("");

    return html;
  }

  render = () => {
    this.$leftSection.innerHTML = this.createDocumentList(this.state);
  };
}

export default LeftSection;
