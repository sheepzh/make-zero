/**
 * Reconstructed @date 2021/04/17
 * 
 * @author zhy
 */
const path = require('path')

const VueLoaderPlugin = require('vue-loader-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Require from this path
const manifest = require('../src/main.js')
const background = require('../src/chrome/config/background')
const contentListener = require('../src/chrome/config/content-listener')
const contentScript = require('../src/chrome/config/content-script')
// @since 1.2.0 Resolve the locale json files
const { chromeMessages } = require('../src/locale/index')

const entry = {}

// Output path is related to the root directory
// The output and input of the background.js
entry[background.script] = './src/background.ts'
entry[contentListener.script] = './src/content-listener.ts'
entry[contentScript.script] = './src/content-script.ts'


// Generate json files 
const generateJsonPlugins = [new GenerateJsonPlugin('manifest.json', manifest)]
for (const localeName in chromeMessages) {
  const locale = chromeMessages[localeName]
  generateJsonPlugins.push(new GenerateJsonPlugin(path.join('_locales', localeName, "messages.json"), locale))
}

const plugins = [
  new VueLoaderPlugin(),
  ...generateJsonPlugins,
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
    'popup': './src/view/popup/index.js',
    'guide': './src/view/guide/index.js'
  },
  output: {
    filename: '[name].js',
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        use: ['ts-loader', {
          loader: 'ui-component-loader',
          options: {
            'element-ui': {
              'camel2': '-'
            }
          }
        }]

      }, {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        // exclude: /node_modules/,
        use: ['url-loader?limit=100000']
      }, {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      }, {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use:
        {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                'component', {
                  "libraryName": "element-ui",
                  "styleLibraryName": "theme-chalk"
                },
                "element-ui"
              ]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", '.ts', ".js", '.vue', 'css'],
  }
}


module.exports = options