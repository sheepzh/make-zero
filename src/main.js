/**
 * Build the manifest.json in chrome extension directory via this file
 * 
 * @author zhy
 * @since 1.0.0
 */
const { version, author, homepage } = require('../package.json')
const permissions = require('./chrome/config/permission')
const background = require('./chrome/config/background')
const contentListener = require('./chrome/config/content-listener')
const contentScript = require('./chrome/config/content-script')
const { defaultLocale } = require('./locale/index')

module.exports = {
    name: '__MSG_app_name__',
    version,
    // @since 1.2.0 defined with i18n
    description: '__MSG_app_description__',
    author,
    default_locale: defaultLocale,
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