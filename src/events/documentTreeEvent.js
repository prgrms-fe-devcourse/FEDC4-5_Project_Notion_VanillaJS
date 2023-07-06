export const documentLinkClickEvent = async ({ event }) => {
  event.preventDefault();
  this.route({ url: event.target.href });
};
