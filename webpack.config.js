const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (_, argv) => {
  const isDevelopment = argv.mode !== 'production';

  return {
    entry: './src/main.js',

    resolve: {
      extensions: ['.js'],
      alias: {
        '@api': path.resolve(__dirname, 'src/api'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@consts': path.resolve(__dirname, 'src/consts'),
        '@core': path.resolve(__dirname, 'src/core'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@public': path.resolve(__dirname, '/public'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },

    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: 'index.js',
      clean: true,
    },

    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: {
        index: '/index.html',
      },
    },

    devtool: isDevelopment ? 'eval-source-map' : 'source-map',

    module: {
      rules: [
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: './index.html',
      }),
    ],
  };
};
