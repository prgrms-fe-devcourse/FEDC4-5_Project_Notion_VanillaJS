import { RouteService } from '@utils/RouteService';
import { requestWithErrorHandle } from '@utils/requestWithErrorHandle';

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
    (error) => {
      console.error(error);
      const router = new RouteService();
      router.replace('/');
    },
  );
}
