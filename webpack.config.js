const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const manifest = require('./src/main.js')
const background = require('./src/chrome/config/background')
const contentListener = require('./src/chrome/config/content-listener')

const entry = {}
// The output and input of the background.js
entry[background.script] = './src/background.ts'
entry[contentListener.script] = './src/content-listener.ts'

module.exports = {
    entry: {
        ...entry,
        'popup': './src/main.js'
    },
    output: {
        path: path.join(__dirname, './dist'),//__dirname node内置变量
        filename: '[name].js',//打包后的文件名
    },
    plugins: [
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

            }
        ]
    },
    resolve: {
        extensions: [".tsx", '.ts', ".js"]
    },
    target: 'node'
}