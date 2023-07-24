const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

export default async function BaseAPI(url, options = {}) {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
        });

        if (res.ok) {
            const json = await res.json();
            return json;
        }

        throw Error('API 에러');
    } catch (e) {
        alert(e.message);
    }
}
