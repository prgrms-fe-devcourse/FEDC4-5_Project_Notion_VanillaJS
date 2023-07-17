const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (_, argv) => {
  const isDevelopment = argv.mode !== 'production';

  return {
    entry: {
      main: './src/main.js', // 파일의 진입점(entry point)는 ./src/main.js가 된다.
    },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@global': path.resolve(__dirname, 'src/utils/global'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@api': path.resolve(__dirname, 'src/utils/api/'),
        '@router': path.resolve(__dirname, 'src/utils/router'),
        '@storage': path.resolve(__dirname, 'src/utils/storage'),
        '@constants': path.resolve(__dirname, 'src/constants'),
      },
    },
    output: {
      path: path.resolve('./dist'), // 빌드 결과물을 저장할 경로를 지정한다.
      filename: '[name].js', // entry point의 Key가 main이므로, main.js로 빌드된다.
      publicPath: '/', // 정적 파일이 위치할 기본 경로를 지정한다.
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'), // 정적 파일이 위치하는 디렉토리를 결정한다.
      },
      client: {
        overlay: {
          errors: true, // 오류 발생시 브라우저 화면에 표시할 지 여부를 결정한다.
          warnings: false, // 경고 발생시 브라우저 화면에 표시할 지 여부를 결정한다.
        },
      },
      historyApiFallback: true, // 404 응답 대신 index.html 페이지를 제공하기 위한 설정이다.
      compress: true, // 정적 파일들을 gzip으로 압축할 지 여부를 결정한다.
      port: 3000,
    },
    devtool: isDevelopment ? 'eval-source-map' : 'source-map', // 개발 시에는 디버그가 편한 eval-source-map을, 배포 시에는 그냥 source-map을 사용한다.
    module: {
      rules: [
        {
          test: /\.css$/, // .css 확장자로 끝나는 모든 파일을 의미한다.
          use: ['style-loader', 'css-loader'], // style-loader를 앞에 적용해야 오류가 발생하지 않는다.
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 파일을 의미한다.
          use: [
            {
              loader: 'file-loader', // 파일을 모듈로 변환하는 역할을 한다.
              options: {
                name: 'assets/fonts/[name].[hash:8].[ext]', // 파일이 저장될 경로와 이름을 지정한다.
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html' }), // 템플릿 HTML의 경로를 지정한다.
    ],
  };
};
