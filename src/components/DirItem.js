import {
  requestAddDir,
  requestAddDoc,
  requestDelItem,
  requestEditDir,
} from "../services/api.js";
import { getItem, setItem } from "../services/storage.js";

export default function DirItem({ $target, dirName = "", reRender, id = null }) {
  this.isDirOpen = getItem(id, true);
  this.state = dirName;

  this.setState = async (nextState) => {
    this.state = nextState;
    this.render();
    await requestEditDir(id, this.state);
  };

  const $dirItemWrapper = document.createElement("div");
  $dirItemWrapper.className = "dirItemWrapper";

  const $dirContentWrapper = document.createElement("div");
  const $dirIcon = document.createElement("i");
  const $dirTitle = document.createElement("span");
  $dirTitle.contentEditable = id === null ? false : true;
  $dirTitle.className = "dirTitle";
  $dirContentWrapper.className = "dirContentWrapper";
  $dirIcon.className = `dirIcon fa-regular ${this.isDirOpen ? 'fa-folder-open' : 'fa-folder'}`;

  const $dirBtnWrapper = document.createElement("div");
  const $dirAddBtn = document.createElement("i");
  const $dirDelBtn = document.createElement("i");
  const $docAddBtn = document.createElement("i");
  $dirBtnWrapper.className = "dirBtnWrapper";
  $dirBtnWrapper.style.display = this.isDirOpen ? "" : "none";
  $dirAddBtn.className = "fa-solid fa-folder-plus";
  $dirDelBtn.className = "fa-solid fa-folder-minus";
  $docAddBtn.className = "fa-regular fa-file";

  $dirContentWrapper.append($dirIcon, $dirTitle);
  $dirBtnWrapper.append($dirAddBtn, id === null ? '' : $dirDelBtn, $docAddBtn);
  $dirItemWrapper.append($dirContentWrapper, $dirBtnWrapper);
  $target.appendChild($dirItemWrapper);

  this.render = () => {
    $dirTitle.textContent = this.state;
  };

  this.toggleDir = (event) => {
    if (event.target.className === "dirTitle" || id === null) return;

    const nextElementSibling = $dirItemWrapper.nextElementSibling;
    if (nextElementSibling.tagName === "UL") {
      nextElementSibling.style.display = this.isDirOpen ? "none" : "";
      $dirBtnWrapper.style.display = this.isDirOpen ? "none" : "";
      $dirIcon.classList.toggle("fa-folder", this.isDirOpen);
      $dirIcon.classList.toggle("fa-folder-open", !this.isDirOpen);
      this.isDirOpen = !this.isDirOpen;
      setItem(id, this.isDirOpen);
    }
  };

  this.handleButtonClick = async (event) => {
    event.stopPropagation();

    if (!event.target.matches("i")) return;

    const { className } = event.target;

    if (className.includes("fa-folder-plus")) {
      await requestAddDir(id);
    } else if (className.includes("fa-folder-minus")) {
      event.target.className = "fa-solid fa-spinner";
      await requestDelItem(id);
    } else if (className.includes("fa-file")) {
      await requestAddDoc(id);
    }

    reRender();
  };

  $dirBtnWrapper.addEventListener("click", this.handleButtonClick);
  $dirItemWrapper.addEventListener("click", this.toggleDir);
  $dirTitle.addEventListener("keyup", (event) => {
    event.stopPropagation();
    this.setState(event.target.textContent);
  });

  this.render();
}
