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

// Generate json files 
const generateJsonPlugins = [new GenerateJsonPlugin('manifest.json', manifest)]
// @since 1.2.0 Resolve the locale json files
const { chromeMessages } = require('./src/locale/index')
for (const localeName in chromeMessages) {
    const locale = chromeMessages[localeName]
    generateJsonPlugins.push(new GenerateJsonPlugin(path.join("_locales", localeName, "messages.json"), locale))
}

// @since 1.2.1 build in alternative environments with different outputs
const argv = process.argv
// default is 'production'
let mode = 'production'
argv.filter(a => a.startsWith('--mode=')).map(a => a.substring(7)).forEach(a => mode = a)
const output_path = { 'production': 'chrome_dir', 'development': 'dist_dev' }

module.exports = {
    entry: {
        ...entry,
        'popup': './src/popup.js'
    },
    output: {
        path: path.join(__dirname, output_path[mode] || 'dist_dev'),
        filename: '[name].js',
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ["*.LICENSE.txt"] // remove the license txts
        }),
        ...generateJsonPlugins,
        // new GenerateJsonPlugin('manifest.json', manifest),
        new CopyWebpackPlugin({ patterns: [{ from: __dirname + '/public', to: './static' }] }) // copy static resources
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: '/node_modules/',
                use: ['ts-loader']

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
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')],
            }
        ]
    },
    resolve: {
        extensions: [".tsx", '.ts', ".js", '.vue', 'css'],
    }
}