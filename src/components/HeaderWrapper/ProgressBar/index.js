import './style.css';

export default function ProgressBar({ $target }) {
  const $progressBar = document.createElement('div');
  $progressBar.className = 'ProgressBar';

  $target.appendChild($progressBar);
}
