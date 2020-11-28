const { name, version, description, author } = require('../package.json')
const permissions = require('./chrome/config/permission')
const background = require('./chrome/config/background')
const contentListener = require('./chrome/config/content-listener')

module.exports = {
    name,
    version,
    description,
    author,
    permissions,
    background: {
        scripts: [
            background.script + '.js'
        ],
        persistent: background.persistent
    },
    content_scripts: [
        {
            matches: [contentListener.matches],
            js: [contentListener.script + '.js'],
            run_at: contentListener.runAt
        }
    ],
    browser_action: {
        // default_popup: "popup.html",
        default_icon: "static/images/icon.png"
    },
    manifest_version: 2
}