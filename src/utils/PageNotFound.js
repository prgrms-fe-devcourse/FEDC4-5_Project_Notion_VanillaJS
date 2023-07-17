export default function PageNotFound($target) {
  const $pageNotFound = document.createElement("div");
  $target.appendChild($pageNotFound);
  $pageNotFound.innerHTML = `
    <span>잘못된 경로입니다.</span>
    `;
}
