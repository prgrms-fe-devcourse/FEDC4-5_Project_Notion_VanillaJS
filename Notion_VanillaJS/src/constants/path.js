import { Home, PostEdit } from '@/pages';

export const routes = [
  { path: /^\/$/, element: Home },
  { path: /^\/documents\/[\d]+$/, element: PostEdit },
];
