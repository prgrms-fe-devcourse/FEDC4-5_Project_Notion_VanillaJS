import {push} from "./router.js"

export const API_END_POINT = "https://kdt-frontend.programmers.co.kr"

export const request = async (url, options = {}) => {
    try{
        const res = await fetch(`${API_END_POINT}${url}`,{
            ...options,
            headers :{
                "Content-Type" : "application/json", //데이터 형식을 json으로 명시합니다.
                "x-username" : "kimdaeun"
            }
        })
        if(res.ok){
            return res.json()
        }
        throw new Error("API 호출 오류")
    }catch(e){
        console.log(e.message)
        push("/")
    }
}