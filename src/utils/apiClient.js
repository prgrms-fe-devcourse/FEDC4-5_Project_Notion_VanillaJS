import { baseUrl, userName } from "../config/apiConfig"

export const apiClient = async (url, method, body, newUser = userName) => {
  try {
    const reqBody = body ? JSON.stringify(body) : null
    const res = await fetch(`${baseUrl}${url}`, {
      method: method,
      headers: {
        "x-username": `${newUser}`,
        "Content-Type": "application/json",
      },
      body: reqBody,
    })
    if (res.ok) return await res.json()
    throw new Error(res.statusText)
  } catch (e) {
    console.error(e.message)
  }
}
