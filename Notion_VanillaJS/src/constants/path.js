import { Home, PostEdit } from '@/pages';

export const routes = [
  { path: /^\/$/, element: Home },
  { path: /^\/posts\/[\d]+$/, element: PostEdit },
  { path: /^\/posts\/new$/, element: PostEdit },
];
