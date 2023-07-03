import { requestDocuments } from "./src/api/api.js";
import LeftSection from "./src/components/LeftSection.js";
import RightSection from "./src/components/RightSection.js";

export const DUMMY_DOCUMENTS = [
  {
    id: 1, // Document id
    title: "노션을 만들자", // Document title
    content: "lala",
    documents: [
      {
        id: 2,
        title: "블라블라",
        content: "BlahBlah",
        documents: [
          {
            id: 3,
            title: "함냐함냐",
            content: "Greeting",
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "hello!",
    content: "Hello, world!",
    documents: [],
  },
];

class App {
  constructor({ $target }) {
    this.init();

    this.$target = $target;

    this.$container = document.createElement("div");
    this.$container.className = "container";
    this.$leftSection = new LeftSection({
      $target: this.$container,
      initialState: DUMMY_DOCUMENTS,
      onClick: () => {
        const { pathname } = window.location;
        this.$rightSection.setState(pathname.replace("/", ""));
        this.$rightSection.render();
      },
    });
    this.$rightSection = new RightSection({
      $target: this.$container,
      initialState: "",
    });

    this.$target.appendChild(this.$container);
  }

  init = async () => {
    const documents = await requestDocuments(`/`);
  };
}

export default App;
