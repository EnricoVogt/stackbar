const path = require('path');
const TSLintPlugin = require('tslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    contentBase: 'dist'
  },
  plugins: [
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    }),
    new CopyWebpackPlugin([{
      from: 'index.html', 
      to: 'index.html',
      transform (content) {
        // change path
        return Buffer.from(content.toString('utf8').replace('https://unpkg.com/@envo/stackbar/dist/envo-stackbar.js', './envo-stackbar.js'))
      }
    }])
  ]
};
