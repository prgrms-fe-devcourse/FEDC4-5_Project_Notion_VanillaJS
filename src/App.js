export default function App({ target }) {
  const pageElem = document.createElement('div');

  pageElem.textContent = '123';

  target.appendChild(pageElem);
}
