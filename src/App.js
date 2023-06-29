import Editor from "./components/Editor.js";
import Sidebar from "./components/Sidebar.js";
import { request } from "./utils/api.js";
import { setLocalStorageItem } from "./utils/storage.js";

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
      }
    ]
  },
  {
    "id": 4,
    "title": "hello!",
    "documents": []
  }
];

export default function App({$target, initialState}){
  this.state = [];

  this.setState = (nextState) => {
    sideBar.setState(DUMMY_DATA);
  }
  let timer = null;
  const sideBar = new Sidebar({$target, initialState : this.state});
  const editor = new Editor({$target, initialState : null, 
    onEditing : (post) => {
      if(timer !== null){
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setLocalStorageItem("post", {
          ...post,
          tempSaveDate : new Date()
        })
      }, 2000)
    }});

  const fetchDocuments = async () => {
    const documents = await request("/documents");
    this.setState(documents);
  }

  fetchDocuments();
}