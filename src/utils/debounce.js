export default function debounce(timer, callback, wait) {
  if (timer) clearTimeout(timer)
  return setTimeout(callback, wait)
}
