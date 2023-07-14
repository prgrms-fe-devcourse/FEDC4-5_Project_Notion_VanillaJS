export function setItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error.message);
  }
}

export function getItem(key, defaultValue) {
  try {
    const storedValue = window.localStorage.getItem(key);
    if (!storedValue) {
      return defaultValue;
    }
    const parsedValue = JSON.parse(storedValue);
    return parsedValue;
  } catch (error) {
    console.log(error.message);
    return defaultValue;
  }
}
