import Sidebar from "./components/Sidebar.js";

const $target = document.querySelector("#app");
const DUMMY_DATA = [
  {
    "id": 1, // Document id
    "title": "노션을 만들자", // Document title
    "documents": [
      {
        "id": 2,
        "title": "블라블라",
        "documents": [
          {
            "id": 3,
            "title": "함냐함냐",
            "documents": []
          }
        ]
      },
      {
        "id": 4,
        "title": "test!",
        "documents": []
      }
    ]
  },
  {
    "id": 4,
    "title": "hello!",
    "documents": []
  }
]


new Sidebar({$target, initialState : DUMMY_DATA});
