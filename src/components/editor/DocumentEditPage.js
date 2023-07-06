import Editor from "./Editor.js";
import LinkButton from "../linkbutton/LinkButton.js";

export default function DocumentEditPage({ parent, initialState, onEditing }) {
  const page = document.createElement('div');
  page.id = 'document-edit-page';

  this.state = initialState;

  new Editor({
    parent: page,
    initialState,
    onEditing
  })

  this.render = () => {
    parent.appendChild(page);
  }

  new LinkButton({
    $target: page,
  })
}
