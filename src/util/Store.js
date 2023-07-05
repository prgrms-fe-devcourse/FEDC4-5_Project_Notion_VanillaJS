import { request } from "./api.js";
import { getItem } from "./storage.js";
class Store {
  constructor() {
    this.state = {
      documentsTree: [],
      documentContent: {},
      selectedStyles: "",
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
    const { id } = await request("/documents", {
      method: "POST",
      body: JSON.stringify(post),
    });
    return id;
    // await this.documentsGet();
  }

  async documentDelete(id) {
    await request(`/documents/${id}`, {
      method: "DELETE",
    });
    await this.documentsGet();
  }

  async documentGet(id) {
    const saveLocalData = getItem(id, false);
    const response = await request(`/documents/${id}`);
    const { updatedAt } = response;

    if (saveLocalData) {
      const { content, saveTime } = saveLocalData;

      const localTime = new Date(saveTime);
      const serverTime = new Date(updatedAt);

      if (localTime.getTime() < serverTime.getTime()) {
        this.setState({ ...this.state, documentContent: response });
      } else {
        this.setState({
          ...this.state,
          documentContent: {
            ...this.state.documentContent,
            content: content,
          },
        });
      }
    }
    this.notifyEditor();
  }

  async documentTitlePut({ id, title }) {
    const { content } = this.state.documentContent;
    await request(`/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
    });
    await this.documentsGet();
  }

  async documentContentPut({ id, content }) {
    const { title } = this.state.documentContent;

    await request(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
    });
  }
}

const store = new Store();

export default store;
