import { CLASSNAME } from "../../utils/constants.js";

export default function PostListHeader({ $target }) {
  const $header = document.createElement("div");
  $header.className = CLASSNAME.POST_LIST_HEADER_DIV;

  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
	  <h3 class=${CLASSNAME.POST_LIST_HEADER}>김정호의 노션</h3>
	`;
  };

  this.render();
}
