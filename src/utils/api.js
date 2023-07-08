const API_END_POINT = "https://kdt-frontend.programmers.co.kr"
const API_USERNAME = "forkhakid9652"

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": API_USERNAME,
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      const json = await res.json()
      return json
    } else {
      throw new Error(`API Fetch Error Code: ${res.status}`)
    }
  } catch (error) {
    console.log(error)
  }
}
