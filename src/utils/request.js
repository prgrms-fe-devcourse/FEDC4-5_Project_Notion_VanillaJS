const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

export const request = async (url, option = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, option);

    if (response.ok) {
      const data = response.json();

      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
