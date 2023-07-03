import { push } from "../../../services/router.js";
import ChildrenListItems from "./ChildrenListItems.js";

export default function ChildrenList({ $target }) {
  const $childrenListWrapper = document.createElement('div');
  
  const $ul = document.createElement('ul');
  $childrenListWrapper.appendChild($ul);
  $target.appendChild($childrenListWrapper);

  this.state = [];
  this.setState = (childrenList) => {
    this.state = childrenList;
    this.render();
  }

  this.render = () => {
    $ul.replaceChildren();
    this.state.map(doc => {
      new ChildrenListItems({
        $target: $ul,
        doc
      })
    })
  }

  $ul.addEventListener('click', event => {
    const $li = event.target.closest('li');
    if ($li) {
      const { id } = $li.dataset;
      push(`/documents/${id}`);
    }
  })
}