const BUTTON_EVENT_NAME = "button-click-event";

export const makeNewPost = (newPost) => {
  window.addEventListener(BUTTON_EVENT_NAME, (e) => {
    const { id } = e.detail;
    newPost(id);
  });
};

export const pushNewPost = (id) => {
  window.dispatchEvent(
    new CustomEvent(BUTTON_EVENT_NAME, {
      detail: {
        id,
      },
    })
  );
};
