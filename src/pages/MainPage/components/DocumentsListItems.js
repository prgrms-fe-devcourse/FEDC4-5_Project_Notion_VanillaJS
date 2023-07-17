import DirItem from "./DirItem.js";
import DocItem from "./DocItem.js";
import { getItem } from "../../../services/storage.js";

export default function DocumentsListItems({
  $target,
  documentItems,
  reRender,
}) {
  this.render = () => {
    documentItems.forEach((item) => {
      const itemType = item.title.split("/")[0];
      if (itemType === "dir") {
        const isDirOpen = getItem(item.id, true); // 폴더 open 상태를 가져옴

        // 폴더 아이템을 나타내는 컴포넌트
        new DirItem({
          $target,
          dirName: item.title.split("/").slice(1).join("/"),
          id: item.id,
          reRender,
        });
        const $ul = document.createElement("ul");
        $ul.classList.toggle("displayNoneFix", !isDirOpen)
        $target.appendChild($ul);
        new DocumentsListItems({
          $target: $ul,
          documentItems: item.documents,
          reRender,
        });
      } else {
        // document 아이템을 나타내는 컴포넌트
        new DocItem({
          $target,
          item,
          reRender,
        });
      }
    });
  };

  this.render();
}
