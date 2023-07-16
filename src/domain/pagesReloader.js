export const pagesReloader = (...pages) => {
  pages.forEach(({ page, arg }) => {
    page.reload(arg);
  });
};
