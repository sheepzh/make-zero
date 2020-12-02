const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader-plugin')

const manifest = require('./src/main.js')
const background = require('./src/chrome/config/background')
const contentListener = require('./src/chrome/config/content-listener')

const contentScript = require('./src/chrome/config/content-script')


const entry = {}
// The output and input of the background.js
entry[background.script] = './src/background.ts'
entry[contentListener.script] = './src/content-listener.ts'
entry[contentScript.script] = './src/content-script.ts'

module.exports = {
    entry: {
        ...entry,
        'popup': './src/popup.js'
    },
    output: {
        path: path.join(__dirname, './chrome_dir'),
        filename: '[name].js',
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({}),
        new GenerateJsonPlugin('manifest.json', manifest),
        new CopyWebpackPlugin({ patterns: [{ from: __dirname + '/public', to: './static' }] }) // copy static resources
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: '/node_modules/',
                use: ['ts-loader']

            }, {
                test: /\.vue$/,
                exclude: '/node_modules/',
                use: ['vue-loader']
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')],
            }
        ]
    },
    resolve: {
        extensions: [".tsx", '.ts', ".js", '.vue', 'css']
    }
}