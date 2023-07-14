module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,

  importOrder: [
    '^@public/(.*)$',
    '^@consts/(.*)$',
    '^@api/(.*)$',
    '^@utils/(.*)$',
    '^@core/(.*)$',
    '^@components/(.*)$',
    '^@pages/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
