const baseOption = require('./webpack.base')

const FileManagerWebpackPlugin = require('filemanager-webpack-plugin')

const { name, version } = require('../package.json')

const normalZipFilePath = `./market_packages/${name}-${version}.zip`
const sourceCodeForFireFox = `./market_packages/${name}-${version}-src.zip`

const srcDir = ['public', 'src', 'package.json', 'tsconfig.json', 'version_log.json', 'webpack']
const copyMapper = srcDir.map(path => { return { source: `./${path}`, destination: `./firefox/${path}` } })

baseOption.plugins.push(
  new FileManagerWebpackPlugin({
    events: {
      onStart: [{ delete: ['./chrome_dir/*'] }],
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

module.exports = baseOption