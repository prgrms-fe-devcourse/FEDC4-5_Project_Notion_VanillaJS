module.exports = {
  plugins: ['prettier'],
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 14,
    sourceType: 'module',
  },
  rules: {
    'no-unused-expressions': 'off', // 바닐라 자바스크립트에서 삼항연산자나 ||, &&를 사용하려면 이 옵션을 꺼야함
  },
};
