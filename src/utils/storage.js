const storage = window.localStorage;

export const setLocalStorageItem = (key, value) => {
  try{
    storage.setItem(key, JSON.stringify(value));
  }catch(e){
    console.log(e.message);
  }
}

export const getLocalStorageItem = (key, defaultValue) => {
  try{
    const storedValue = storage.getItem(key);
    if(!storedValue){
      return defaultValue;
    }
    const parsedValue = JSON.parse(storedValue);
    return parsedValue;
  }catch(e){
    return defaultValue;
  }
}

export const removeLocalStorageItem = (key) => {
  storage.removeItem(key);
}