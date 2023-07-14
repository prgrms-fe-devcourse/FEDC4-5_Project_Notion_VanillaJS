import { RouteService } from './utils/RouteService';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';

export default function App({ targetElement }) {
  const router = new RouteService();
  router
    .addRoute({
      match: (pathname) => pathname === '/',
      page: () => new HomePage({ targetElement }),
    })
    .addRoute({
      match: (pathname) => pathname.indexOf('/documents') === 0,
      page: () => new EditPage({ targetElement }),
    })
    .addRoute({
      match: () => true,
      page: () => new NotFoundPage({ targetElement }),
    })
    .start();
}
