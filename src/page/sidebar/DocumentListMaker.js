// import toggleBtn from "./toggle.png";

export const listMaker = (item, depth = 1) => {
  const $div = document.createElement("div");
  $div.innerHTML = eachItemMaker(item, depth);

  // 현재 document가 자식 document를 가지고 있으면
  const childItems = item.documents;
  if (childItems.length > 0) {
    const $ul = document.createElement("ul");
    $ul.className = "dropdownUl";
    childItems.forEach((child) => $ul.appendChild(listMaker(child, depth + 1)));
    $div.appendChild($ul);
  }
  return $div;
};

const eachItemMaker = (item, depth) => {
  return `
    <li data-id="${item.id}" style="padding-left: ${depth}px;">
        <button class="toggleBtn">></button>
        <span class="documentTitle">${item.title}</span>
        <button data-id="${item.id}" class="add">+</button>
        <button data-id="${item.id}" class="delete">-</button>
    </li>
  `;
};
