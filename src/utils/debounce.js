export default function debounce(func, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), delay);
  };
}
