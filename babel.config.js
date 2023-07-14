module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api': './src/api',
          '@components': './src/components',
          '@consts': './src/consts',
          '@core': './src/core',
          '@pages': './src/pages',
          '@public': './public',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
