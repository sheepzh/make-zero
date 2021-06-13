/**
 * Reconstructed @date 2021/04/17
 * 
 * @author zhy
 */
import webpack from 'webpack'
import GenerateJsonPlugin from 'generate-json-webpack-plugin'
import GenerateLocaleForChrome from './plugins/generate-locale-for-chrome'
import CopyWebpackPlugin from 'copy-webpack-plugin'

// Require from this path
import manifest from '../src/main'
import background from '../src/chrome/config/background'
import contentListener from '../src/chrome/config/content-listener'
import contentScript from '../src/chrome/config/content-script'

const entry = {}

// Output path is related to the root directory
// The output and input of the background.js
entry[background.script] = './src/background.ts'
entry[contentListener.script] = './src/content-listener.ts'
entry[contentScript.script] = './src/content-script.ts'

const plugins: webpack.WebpackPluginInstance[] = [
  new GenerateJsonPlugin('manifest.json', manifest) as unknown as webpack.WebpackPluginInstance,
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

const options: webpack.Configuration = {
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

export default options