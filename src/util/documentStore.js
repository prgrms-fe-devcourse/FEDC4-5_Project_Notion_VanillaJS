import { request } from "./api.js";

export default class store {
  constructor() {
    this.state = {
      documentsTree: [],
      documentContent: {},
      selectDocumentId: 0,
    };
  }

  setState(nextState) {
    this.state = nextState;
  }

  async documentsGet() {
    const documentsTree = await request("/documents");
    this.setState({ ...this.state, documentsTree });
  }

  async documentProduce(post) {
    await request("/documents", {
      method: "POST",
      body: JSON.stringify(post),
    });
    await this.documentsGet();
  }

  async documentDelet(id) {
    await request(`/documents/${id}`, {
      method: "DELETE",
    });
    await this.documentsGet();
  }
}
