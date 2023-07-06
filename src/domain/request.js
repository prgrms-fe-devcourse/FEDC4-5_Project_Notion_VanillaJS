import { requestWithErrorHandle } from '../utils/requestWithErrorHandle';
import { RouteService } from '../utils/RouteService';

export function request(url, option) {
  return requestWithErrorHandle(
    `${import.meta.env.VITE_API_END_POINT}/${url}`,
    {
      ...option,
      headers: {
        'Content-Type': 'application/json',
        'x-username': `${import.meta.env.VITE_X_USERNAME}`,
      },
    },
    () => {
      const router = new RouteService();
      router.replace('/');
    },
  );
}
