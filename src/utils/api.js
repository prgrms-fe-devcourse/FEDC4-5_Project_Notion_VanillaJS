const API_END_POINT  = `https://kdt-frontend.programmers.co.kr`;
const UNIQUE_KEY = `GuNwOoParK1359602@#!%`

export const request = async (url, option = {}) => {
  try{
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...PushSubscriptionOptions,
      headers : {
        "Content-Type" : "application/json",
        "x-username" : UNIQUE_KEY        
      }
    });

    if(res.ok){
      const json = await res.json();
      return json;
    }else{
      throw new Error("API 호출 오류");
    }
  }catch(e){
    alert(e.message);
  }
}