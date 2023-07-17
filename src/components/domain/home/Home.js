import { PATH } from "../../../constants/path.js";
import { debounce } from "../../../utils/debounce.js";
import { push } from "../../../utils/route.js";
import {
  RECENT_SEARCH_LIST,
  getItem,
  setItem,
} from "../../../utils/storage.js";

export default function Home({ parentElement, search }) {
  if (!new.target) return new Home(...arguments);

  const containerElement = document.createElement("div");
  containerElement.className = "home-container";

  const processSearch = debounce((value) => {
    if (value === "") {
      this.setState({ text: value, list: [] });
      return;
    }

    const newState = { text: value, list: search(value) };
    this.setState(newState);
  });

  this.state = { text: "", list: [] };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  containerElement.addEventListener("input", (e) => {
    if (!e.target.closest(".search")) return;

    processSearch(e.target.value);
  });

  containerElement.addEventListener("click", (e) => {
    if (!e.target.closest(".search-result-item")) return;

    const { dataset, innerText } = e.target;
    const newSearchItem = { id: dataset.id, title: innerText };

    push(`${PATH.DOCUMENTS}/${dataset.id}`);

    setItem(
      RECENT_SEARCH_LIST,
      [newSearchItem, ...getItem(RECENT_SEARCH_LIST, [])].slice(0, 5)
    );
  });

  this.render = () => {
    parentElement.append(containerElement);
    containerElement.innerHTML = `
      <div class="search-container">
      <input placeholder="Jongtion 전체 문서 검색" class="search" value="${
        this.state.text
      }" />
      ${
        this.state.list.length === 0 && this.state.text !== ""
          ? `<p>${this.state.text}와(과) 일치하는 검색결과가 없습니다.</p>`
          : `<ul>${this.state.list
              .map(
                (item) =>
                  `<li data-id=${item.id} class="search-result-item">${
                    item.title === "" ? "제목 없음" : item.title
                  }</li>`
              )
              .join("")}
            </ul>`
      }
      </div>
      <div class="recent-search-container">
        <h2 class="recent-search-title">최근 검색 문서 목록</h2>
        <ul>
        ${getItem(RECENT_SEARCH_LIST, [])
          .map(
            (item) =>
              `<li data-id="${item.id}" class="recent-search-item">${item.title}</li>`
          )
          .join("")}
        </ul>
      </div>
    `;

    const searchElement = containerElement.querySelector(".search");

    searchElement.focus();
    const val = searchElement.value;
    searchElement.value = "";
    searchElement.value = val;
  };
}
