import { CLASSNAME } from "../../utils/constants.js";

export default function Editor({ $target, initialState, onEdit }) {
  const $editor = document.createElement("div");
  $editor.className = CLASSNAME.EDIT_PAGE_EDITOR;
  $target.appendChild($editor);

  $editor.innerHTML = `
	   <input class=${CLASSNAME.EDITOR_TITLE} type="text" placeholder ="제목 없음"/>
	   <textarea class=${CLASSNAME.EDITOR_CONTENT} placeholder='내용을 입력하세요'></textarea> 
	  `;

  $editor.addEventListener("keyup", () => {
    const title = $editor.querySelector(`.${CLASSNAME.EDITOR_TITLE}`).value;
    const content = $editor.querySelector(`.${CLASSNAME.EDITOR_CONTENT}`).value;

    this.state = {
      ...this.state,
      title: title,
      content: content,
    };

    onEdit(this.state);
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector(`.${CLASSNAME.EDITOR_TITLE}`).value = title;
    $editor.querySelector(`.${CLASSNAME.EDITOR_CONTENT}`).value = content;
  };
}
