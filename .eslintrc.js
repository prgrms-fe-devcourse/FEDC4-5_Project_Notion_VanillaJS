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
    'import/prefer-default-export': 'off',
    'import/extensions': ['off'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-unused-expressions': 'off', // 바닐라JS에서 삼항연산자나 ||, &&를 사용하려면 이 옵션을 꺼야함
    'no-new': 0,
    'no-console': 'off',
  },
};
