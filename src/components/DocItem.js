import { requestDelItem } from "../services/api.js";

export default function DocItem({ $target, item, reRender }) {
  const $li = document.createElement('li');
  const $docTitle = document.createElement('div');
  const $docDelButton = document.createElement('i');

  $docTitle.className = 'docTitle';
  $docDelButton.classList.add('fa-solid', 'fa-trash', 'docDelBtn');

  $li.append($docTitle, $docDelButton);
  $target.appendChild($li);

  $docDelButton.addEventListener('click', async event => {
    event.stopPropagation();
    const $li = event.target.closest('li');

    if ($li) {
      const { id } = $li.dataset;
      event.target.className = "fa-solid fa-spinner";
      await requestDelItem(id);
      reRender();
    }
  })
  
  this.render = () => {
    $li.dataset.id = item.id;
    $docTitle.textContent = item.title;
  }

  this.render();
}