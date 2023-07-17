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
    const openState = localStorage.getItem(id);

    return openState === null ? false : true;
  } catch (error) {
    throw new Error(error.message);
  }
};
