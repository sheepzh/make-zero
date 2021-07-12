/**
 * Build the manifest.json in chrome extension directory via this file
 * 
 * @author zhy
 * @since 1.0.0
 */
//@ts-ignore
import { version, author, homepage } from '../package.json'
import permissions from './chrome/config/permission'
import background from './chrome/config/background'
import contentListener from './chrome/config/content-listener'
import contentScript from './chrome/config/content-script'
import { Locale } from './locale/constant'

const manifest = {
    name: '__MSG_app_name__',
    version,
    // @since 1.2.0 defined with i18n
    description: '__MSG_app_description__',
    icons: {
        "16": "static/images/icon.png",
        "48": "static/images/icon.png",
        "128": "static/images/icon.png"
    },
    author,
    default_locale: Locale.ZH_CN,
    permissions,
    homepage_url: homepage,
    commands: {
        _execute_browser_action: {
            suggested_key: {
                default: "Ctrl+Shift+Y",
                mac: "Command+Shift+Y"
            },
            description: "Open the popup page."
        },
    },
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

export default manifest