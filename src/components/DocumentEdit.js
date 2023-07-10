import { getDocument } from "../service/crud.js";
import Editor from "./Editor.js";

export default function DocumentEdit({ $target, initialState, documentID }) {
  const $div = document.createElement("div");
  $target.appendChild($div);
  $div.className = "document-editor";

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // id를 가지고 요청한 걸 띄워준다.
  const pageData = async () => {
    return await getDocument(documentID);
  };

  this.render = async () => {
    const { id, title, content = "내용없음" } = await pageData();
    const editor = new Editor({
      $target: $div,
      title,
      content,
      keyOn: () => {
        console.log(this.state);
      },
    });
    // props로 전달하고 띄워줘야지...!
  };
  this.render();
}
