module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
    'no-new': 'off',
  },
};
