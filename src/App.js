import DocumentList from "./components/DocumentList.js";
import Editor from "./components/Editor.js";
import { initRouter, request } from "./service/index.js";

export default class App {
  constructor({ $target }) {
    this.$target = $target;

    this.state = [
      {
        id: 1, // Document id
        title: "노션을 만들자", // Document title
        documents: [
          {
            id: 2,
            title: "블라블라",
            documents: [
              {
                id: 3,
                title: "함냐함냐",
                documents: [],
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: "hello!",
        documents: [],
      },
    ];

    this.documentList = new DocumentList({
      $parent: this.$target,
      initialState: this.state,
    });
    this.editor = new Editor({
      $parent: this.$target,
      initialState: {
        id: 1,
        title: "",
        content: "",
        createdAt: "",
        updatedAt: "",
      },
    });

    this.route();

    initRouter(() => this.route());

    this.setState();
  }

  route() {
    const { pathname } = location;

    if (pathname === "/") {
      // this.documentList.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      // const [, , documentId] = pathname.split("/");
      // this.editor.setState({ documentId });
    }
  }

  async setState() {
    const res = await request("/documents");

    this.state = res;

    this.documentList.setState(res);
  }
}
