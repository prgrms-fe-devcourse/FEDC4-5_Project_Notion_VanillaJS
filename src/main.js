import App from "./App.js";
import { request } from "./api.js";

const DUMMY_DATA = [
  {
    id: 1,
    title: "문서 제목1",
  },
  {
    id: 2,
    title: "문서 제목2",
  },
  {
    id: 3,
    title: "문서 제목3",
  },
  {
    id: 4,
    title: "문서 제목4",
  },
  {
    id: 5,
    title: "문서 제목5",
  },
];

const appEl = document.querySelector("#app");
let data;

const app = new App({
  targetEl: appEl,
  initialState: [],
});

(async () => {
  data = await request.getDocumentList();
  app.setState(data);
})();
