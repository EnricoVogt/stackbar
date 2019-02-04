const path = require('path');
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = {
  entry: './src/envo-stackbar.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'envo-stackbar.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    hot: true,
    watchContentBase: true,
    contentBase: 'dev'
  },
  plugins: [
    new TSLintPlugin({
        files: ['./src/**/*.ts']
    })
  ]
};
