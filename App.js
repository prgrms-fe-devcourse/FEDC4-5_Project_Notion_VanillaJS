import { requestDocuments } from "./src/api/api.js";
import LeftSection from "./src/components/LeftSection.js";

const DUMMY_DOCUMENTS = [
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

class App {
  constructor({ $target }) {
    this.init();

    this.$target = $target;

    this.$container = document.createElement("div");
    this.$container.className = "container";

    this.$leftSection = new LeftSection({
      $target: this.$container,
      initialState: DUMMY_DOCUMENTS,
    });
    this.$target.appendChild(this.$container);
  }

  init = async () => {
    const documents = await requestDocuments(`/`);
    console.log(documents);
  };
}

export default App;
