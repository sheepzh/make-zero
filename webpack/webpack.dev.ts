import path from 'path'
import webpack from 'webpack'
import baseOption from './webpack.common'
import GenerateJsonPlugin from 'generate-json-webpack-plugin'
import FileManagerWebpackPlugin from 'filemanager-webpack-plugin'

import manifest from '../src/manifest'

// Build for Firefox
const manifestFirefoxName = 'manifest-firefox.json'
// The manifest.json is different from Chrome's with add-on ID
const firefoxManifestGeneratePlugin = new GenerateJsonPlugin(manifestFirefoxName, { ...manifest, browser_specific_settings: { gecko: { id: 'make-zero@zhy' } } })
const firefoxDevDir = './firefox_dev'
const fileCopyForFirefox = new FileManagerWebpackPlugin({
  events: {
    onEnd: [
      {
        copy: [
          { source: './dist_dev', destination: firefoxDevDir }
        ],
        delete: [`./dist_dev/${manifestFirefoxName}`, `${firefoxDevDir}/manifest.json`],
        move: [
          { source: `${firefoxDevDir}/${manifestFirefoxName}`, destination: `${firefoxDevDir}/manifest.json` }
        ]
      }
    ]
  }
})

baseOption.plugins.push(
  firefoxManifestGeneratePlugin as unknown as webpack.WebpackPluginInstance,
  fileCopyForFirefox as webpack.WebpackPluginInstance,
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false
  })
)

// No eval with development, but generate *.map.js
baseOption.devtool = 'cheap-module-source-map'

// Use cache with filesystem
baseOption.cache = { type: 'filesystem' }

baseOption.output.path = path.resolve(__dirname, '..', 'dist_dev')

export default baseOption