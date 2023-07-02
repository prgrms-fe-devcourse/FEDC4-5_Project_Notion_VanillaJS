import { request } from "./api.js";

class Store {
  constructor() {
    this.state = {
      documentsTree: [],
      documentContent: {},
      selectDocumentId: 0,
    };
  }
  sidebarSubscribers = [];
  editorSubscribers = [];

  subscribeSidebar(subscriber) {
    this.sidebarSubscribers.push(subscriber);
  }

  subscribeEditor(subscriber) {
    this.editorSubscribers.push(subscriber);
  }

  notifySidebar() {
    this.sidebarSubscribers.forEach((subscriber) => subscriber());
  }

  notifyEditor() {
    this.editorSubscribers.forEach((subscriber) => subscriber());
  }

  setState(nextState) {
    this.state = nextState;
  }

  async documentsGet() {
    const documentsTree = await request("/documents");
    this.setState({ ...this.state, documentsTree });
    this.notifySidebar();
  }

  async documentProduce(post) {
    await request("/documents", {
      method: "POST",
      body: JSON.stringify(post),
    });
    await this.documentsGet();
  }

  async documentDelete(id) {
    await request(`/documents/${id}`, {
      method: "DELETE",
    });
    await this.documentsGet();
  }
}

const store = new Store();

export default store;
