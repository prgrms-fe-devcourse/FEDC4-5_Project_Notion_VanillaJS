export const setOpenDocument = (id) => {
  try {
    localStorage.setItem(id, true);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setCloseDocumet = (id) => {
  try {
    localStorage.removeItem(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCurrOpenState = (id) => {
  try {
    return JSON.parse(localStorage.getItem(id));
  } catch (error) {
    throw new Error(error.message);
  }
};
