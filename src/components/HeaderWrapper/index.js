import Header from '@components/HeaderWrapper/Header';
import ProgressBar from '@components/HeaderWrapper/ProgressBar';

import './style.css';

export default function HeaderWrapper({ $target, initialState }) {
  const $headerWrapper = document.createElement('section');
  $headerWrapper.className = 'HeaderWrapper';
  $target.appendChild($headerWrapper);

  this.state = initialState;

  new ProgressBar({ $target: $headerWrapper });
  new Header({ $target: $headerWrapper, initialState: this.state });
}
