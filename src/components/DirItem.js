import { requestAddDir, requestAddDoc, requestDelItem } from "../services/api.js";

export default function DirItem({
  $target,
  dirName = "",
  reRender,
  parentId = null,
  id,
}) {
  this.isDirOpen = true;
  const $dirItemWrapper = document.createElement("div");
  $dirItemWrapper.className = "dirItemWrapper";

  const $dirContentWrapper = document.createElement("div");
  const $dirIcon = document.createElement("i");
  const $dirTitle = document.createElement("span");
  $dirContentWrapper.className = "dirContentWrapper";
  $dirIcon.className = "dirIcon fa-regular fa-folder-open";

  const $dirBtnWrapper = document.createElement("div");
  const $dirAddBtn = document.createElement("i");
  const $dirDelBtn = document.createElement("i");
  const $docAddBtn = document.createElement("i");
  $dirBtnWrapper.className = "dirBtnWrapper";
  $dirAddBtn.className = "fa-solid fa-folder-plus";
  $dirDelBtn.className = "fa-solid fa-folder-minus";
  $docAddBtn.className = "fa-regular fa-file";

  $dirContentWrapper.append($dirIcon, $dirTitle);
  $dirBtnWrapper.append($dirAddBtn, $dirDelBtn, $docAddBtn);
  $dirItemWrapper.append($dirContentWrapper, $dirBtnWrapper);
  $target.appendChild($dirItemWrapper);

  this.render = () => {
    $dirTitle.textContent = dirName;
  };

  this.toggleDir = () => {
    const nextElementSibling = $dirItemWrapper.nextElementSibling;
    if (nextElementSibling.tagName === "UL") {
      nextElementSibling.style.display = this.isDirOpen ? "none" : "";
      $dirIcon.classList.toggle("fa-folder", this.isDirOpen);
      $dirIcon.classList.toggle("fa-folder-open", !this.isDirOpen);
      this.isDirOpen = !this.isDirOpen;
    }
  };

  this.handleButtonClick = async (event) => {
    event.stopPropagation();

    if (!event.target.matches("i")) return;

    const { className } = event.target;

    if (className.includes("fa-folder-plus")) {
      await requestAddDir(id);
    } else if (className.includes("fa-folder-minus")) {
      await requestDelItem(id);
    } else if (className.includes("fa-file")) {
      await requestAddDoc(id);
    }

    reRender();
  };

  $dirBtnWrapper.addEventListener("click", this.handleButtonClick);
  $dirItemWrapper.addEventListener("click", this.toggleDir);

  this.render();
}
