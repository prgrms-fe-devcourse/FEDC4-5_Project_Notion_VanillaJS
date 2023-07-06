import './style.css';

export default function Header({ $target, initialState }) {
  const $header = document.createElement('header');
  $header.className = 'Header';

  this.state = initialState;

  $header.textContent = this.state;

  $target.appendChild($header);
}
