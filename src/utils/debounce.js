export default function debounce(afterTimer, wait) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => afterTimer.apply(this, args), wait)
  }
}
