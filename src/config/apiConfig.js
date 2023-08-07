const { VITE_BASE_URL, VITE_USERNAME } = import.meta.env

const mode = import.meta.env.MODE // 'development', 'test', 'production'

const baseUrl = { development: "https://kdt-frontend.programmers.co.kr", production: VITE_BASE_URL }[mode]
const userName = { development: "oaoong", production: VITE_USERNAME }[mode]

export { baseUrl, userName }
