const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    'remark-parse': {
      commonjs: 'remark-parse',
      commonjs2: 'remark-parse',
      amd: 'remark-parse',
      root: 'remark-parse'
    },
    'unified': {
      commonjs: 'unified',
      commonjs2: 'unified',
      amd: 'unified',
      root: 'unified'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            plugins: [require('babel-plugin-external-helpers')]
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })
  ]
}
