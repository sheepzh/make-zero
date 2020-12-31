const { name, version, description, author, homepage } = require('../package.json')
const permissions = require('./chrome/config/permission')
const background = require('./chrome/config/background')
const contentListener = require('./chrome/config/content-listener')
const contentScript = require('./chrome/config/content-script')

module.exports = {
    name,
    version,
    description,
    author,
    permissions,
    homepage_url: homepage,
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
        }, {
            matches: [contentScript.matches],
            js: [contentScript.script + '.js'],
            run_at: contentScript.runAt
        }
    ],
    browser_action: {
        default_popup: "static/popup.html",
        default_icon: "static/images/icon.png"
    },
    manifest_version: 2
}