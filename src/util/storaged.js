const storaged = window.localStorage;

export const getItem = (key, defaultValue) => {
  try {
    const resultItem = JSON.parse(storaged.getItem(key));
    return resultItem ? resultItem : defaultValue;
  } catch (e) {
    alert(e.message);
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  storaged.setItem(key, JSON.stringify(value));
};
