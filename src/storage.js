const storage = window.localStorage;

// 가져올때는 JSON.parse() 역직렬화 해서 가져오기
export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

// 넣을때는 JSON.stringify()로 직렬화해서 넣어야 한다.
export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
