import { Home, PostEdit } from '@/components';

export const routes = [
  { path: /^\/$/, element: Home },
  { path: /^\/posts\/[\d]+$/, element: PostEdit },
  { path: /^\/posts\/new$/, element: PostEdit },
];
