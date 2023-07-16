import { Breadcrumb } from '../../components/index.js';

export default function createBreadcrumb() {
  const { $target } = this;

  return new Breadcrumb({
    $target: $target.querySelector('.main__breadcrumb'),
  });
}
