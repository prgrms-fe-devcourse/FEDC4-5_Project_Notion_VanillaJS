import { request } from "./api.js";
import modal from "./Modal.js";

function navDraw(documents, $target, fetchSidebar, onChange) {
  const $div = document.createElement("div");

  if ($target.parentNode.className !== "notion-sidebar-container")
    $div.style.setProperty("display", "none");

  // 데이터 추가하기
  for (let i = 0; i < documents.length; i++) {
    const $list = document.createElement("div");
    $list.setAttribute("data-id", documents[i].id);
    $list.className = "container";
    $list.addEventListener("click", (e) => {
      history.pushState(
        null,
        null,
        `/content/${e.target.parentNode.getAttribute("data-id")}`
      );
      onChange(e.target.parentNode.getAttribute("data-id"));
    });

    $list.addEventListener("mouseover", (e) => {
      if (e.target.tagName === "SPAN") {
        e.target.parentNode.style.backgroundColor = "lightgray";
      }
    });

    $list.addEventListener("mouseout", (e) => {
      if (e.target.tagName === "SPAN") {
        e.target.parentNode.style.backgroundColor = "";
      }
    });

    const $toggleButton = document.createElement("button");
    $toggleButton.innerText = ">";
    $toggleButton.addEventListener("click", (e) => {
      const childNode = e.target.nextSibling.childNodes;
      for (let i = 0; i < childNode.length; i++) {
        if (childNode[i].nodeName === "DIV")
          childNode[i].style.display === "block"
            ? (childNode[i].style.display = "none")
            : (childNode[i].style.display = "block");
      }
    });
    $list.appendChild($toggleButton);

    const $span = document.createElement("span");
    $span.innerText = documents[i].title;
    $list.appendChild($span);

    const $deleteButton = document.createElement("button");
    $deleteButton.innerText = "-";
    $deleteButton.className = "delete";
    $deleteButton.addEventListener("click", async (e) => {
      const id = e.target.parentNode.getAttribute("data-id");
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      fetchSidebar();
    });
    $list.appendChild($deleteButton);

    buttonModal($list);
    $div.append($list);

    if (documents[i].documents.length !== 0)
      navDraw(documents[i].documents, $span);
  }
  // 마지막에 자식노드 바꾸기
  const secondChild = $target.children[1];
  if (secondChild) $target.replaceChild($div, $target.children[1]);
  else $target.appendChild($div);
}

function buttonModal($target) {
  const $button = document.createElement("button");
  const $modal = document.getElementById("modal");

  $button.innerText = "+";
  $button.className = "plus";

  $button.addEventListener("click", (e) => {
    $modal.style.display = "block";
  });
  $target.appendChild($button);
}

export default function Sidebar({ $target, initialState, onChange }) {
  const fetchSidebar = async () => {
    const documents = await request("/documents");
    this.setState(documents);
  };
  modal(fetchSidebar);
  const $nav = document.createElement("nav");
  $nav.innerText = "사이드바";

  $target.appendChild($nav);
  buttonModal($nav, fetchSidebar);
  fetchSidebar();

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    navDraw(this.state, $nav, fetchSidebar, onChange);
  };

  this.render();
}
