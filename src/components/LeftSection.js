class LeftSection {
  constructor({ $target, initialState }) {
    this.$target = $target;
    this.state = initialState;

    this.$leftSection = document.createElement("section");
    this.$leftSection.className = "left-section";
    this.$target.appendChild(this.$leftSection);

    this.render();
  }

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
