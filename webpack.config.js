const path = require('path')
const webpack = require('webpack')
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader-plugin')
const FileManagerWebpackPlugin = require('filemanager-webpack-plugin')

const manifest = require('./src/main.js')
const background = require('./src/chrome/config/background')
const contentListener = require('./src/chrome/config/content-listener')

const contentScript = require('./src/chrome/config/content-script')
const resolveEnv = require('./env')

const { env, variables } = resolveEnv(__dirname)

const { name, version } = require('./package.json')

// @since 1.2.1 add url permission
let api = variables.BASE_URL_API
let feedbackEnabled = variables.FEEDBACK_ENABLED
if (!!api && !!manifest.permissions && feedbackEnabled === 'true') {
    api = api.substring(1, api.length - 1)
    if (!api.endsWith('/')) {
        api += '/'
    }
    manifest.permissions.push(api)
}

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

const plugins = [
    new VueLoaderPlugin(),
    ...generateJsonPlugins,
    // new GenerateJsonPlugin('manifest.json', manifest),
    new CopyWebpackPlugin({ patterns: [{ from: __dirname + '/public', to: './static' }] }), // copy static resources
    // Define environment variables
    new webpack.DefinePlugin({
        'process.env': {
            ENV: env,
            ...variables
        }
    })
]

if (env === 'production') {
    const normalZipFilePath = `./market_packages/${name}-${version}.zip`
    const sourceCodeForFireFox = `./market_packages/${name}-${version}-src.zip`

    const srcDir = ['public', 'src', '.env.development', '.env.production', 'env.js', 'package.json', 'tsconfig.json', 'version_log.json', 'webpack.config.js']
    const copyMapper = srcDir.map(path => { return { source: `./${path}`, destination: `./firefox/${path}` } })

    plugins.push(
        new FileManagerWebpackPlugin({
            events: {
                // Archive at the end
                onEnd: [
                    // Delete license files
                    { delete: ['./chrome_dir/*.LICENSE.txt'] },
                    // Define plugin to archive zip for differrent markets
                    {
                        delete: [normalZipFilePath],
                        archive: [
                            { source: './chrome_dir', destination: normalZipFilePath },
                        ]
                    },
                    // Archive srouce code for FireFox
                    {
                        copy: [
                            { source: './doc/for-fire-fox.md', destination: './firefox/README.md' },
                            { source: './doc/for-fire-fox.md', destination: './firefox/doc/for-fire-fox.md' },
                            ...copyMapper
                        ],
                        archive: [
                            { source: './firefox', destination: sourceCodeForFireFox },
                        ],
                        delete: ['./firefox']
                    }
                ]
            }
        })
    )
}

const options = {
    entry: {
        ...entry,
        'popup': './src/popup.js'
    },
    output: {
        path: path.join(__dirname, { 'production': 'chrome_dir', 'development': 'dist_dev' }[env] || 'dist_dev'),
        filename: '[name].js',
    },
    plugins,
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

if (env === 'development') {
    // no eval with development, but generate *.map.js
    options.devtool = 'cheap-module-source-map'
}

module.exports = options