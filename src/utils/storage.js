const storage = (function (storage) {
  const setItem = (key, value) => {
    try {
      storage.setItem(key, value)
      return storage.getItem(key)
    } catch (error) {
      console.error(error)
    }
  }

  const getItem = (key, defaultValue) => {
    try {
      const storedValue = storage.getItem(key)

      if (storedValue) {
        return JSON.parse(storedValue)
      }
      return defaultValue
    } catch (error) {
      return storage.getItem(key)
    }
  }

  return {
    setItem,
    getItem,
  }
})(window.localStorage)

export default storage
