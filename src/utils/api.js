import { API_END_POINT, UNIQUE_KEY } from "../constants/constants.js";
import { replaceHistory } from "./router.js";

export const request = async (url, option = {}) => {
  try{
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...option,
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
    replaceHistory("/");
  }
}