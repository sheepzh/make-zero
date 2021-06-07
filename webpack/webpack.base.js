/**
 * Reconstructed @date 2021/04/17
 * 
 * @author zhy
 */
const path = require('path')
const GenerateLocaleForChrome = require('./plugins/generate-locale-for-chrome')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Require from this path
const manifest = require('../src/main.js')
const background = require('../src/chrome/config/background')
const contentListener = require('../src/chrome/config/content-listener')
const contentScript = require('../src/chrome/config/content-script')

const entry = {}

// Output path is related to the root directory
// The output and input of the background.js
entry[background.script] = './src/background.ts'
entry[contentListener.script] = './src/content-listener.ts'
entry[contentScript.script] = './src/content-script.ts'



const plugins = [
  new GenerateJsonPlugin('manifest.json', manifest),
  new GenerateLocaleForChrome('locale', './src/locale'),
  new CopyWebpackPlugin({
    // copy static resources
    patterns: [
      {
        from: './public',
        to: './static'
      }
    ]
  })
]


const options = {
  entry: {
    ...entry,
    'popup': './src/view/popup/index',
    'guide': './src/view/guide/index'
  },
  output: {
    filename: '[name].js',
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: '/node_modules/',
        use: ['ts-loader']
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }, {
        test: /\.sc|ass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        // exclude: /node_modules/,
        use: ['url-loader?limit=100000']
      }, {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', ".js", '.css', '.scss', '.sass'],
  }
}


module.exports = options