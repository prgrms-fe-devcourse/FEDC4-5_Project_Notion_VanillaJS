export default {
  build: {
    target: ['edge79', 'firefox68', 'chrome61', 'safari11.1'],
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
};
