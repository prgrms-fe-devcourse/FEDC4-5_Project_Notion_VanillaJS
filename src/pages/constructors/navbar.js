import { Navbar } from '../../components/index.js';

export default function createNavbar() {
  const { $target } = this;

  return new Navbar({
    $target: $target.querySelector('.main__navbar'),
  });
}
