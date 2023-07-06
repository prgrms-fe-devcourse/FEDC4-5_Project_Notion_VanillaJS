const DEFAULT_ENDPOINT = 'https://kdt-frontend.programmers.co.kr'

export const request = async(url='', options) => {
    try{
        const res = await fetch(`${DEFAULT_ENDPOINT}${url}`, {
            ...options,
            headers: {
                'x-username': 'eugene',
                'Content-Type': 'application/json'
            }
        })
        if(res.ok){
            const json = await res.json();
            return json
        }
        throw new Error('API호출 오류');
    } 
    catch(e){
        alert(e.message);
    }
}