const storage = window.localStorage;

export const setItem = (key, value) => {
  // 스토리지 용량 초과 발생 가능함=>trycatch로 방어
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getItem = (key, defaultValue) => {
  //defaultValue는 key가 없을 때
  try {
    const storedValue = storage.getItem(key);

    if (!storedValue) {
      return defaultValue;
    }

    const parsedValue = JSON.parse(storedValue);
    return parsedValue;

    // return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const removeItem = key => {
  storage.removeItem(key);
};
