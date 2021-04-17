const baseOption = require('./webpack.base')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const FileManagerWebpackPlugin = require('filemanager-webpack-plugin')

const manifest = require('../src/main.js')


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

baseOption.plugins.push(firefoxManifestGeneratePlugin, fileCopyForFirefox)

// No eval with development, but generate *.map.js
baseOption.devtool = 'cheap-module-source-map'

// Use cache with filesystem
baseOption.cache = { type: 'filesystem' }

module.exports = baseOption