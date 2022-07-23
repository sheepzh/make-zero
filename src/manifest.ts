/**
 * Build the manifest.json in chrome extension directory via this file
 * 
 * @author zhy
 * @since 1.0.0
 */
//@ts-ignore
import { version, author, homepage } from '../package.json'

const manifest: chrome.runtime.ManifestV2 = {
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
    default_locale: 'en',
    permissions: [
        "storage",
        "tabs",
        "contextMenus"
    ],
    optional_permissions: [
        'clipboardRead'
    ],
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
            'background.js'
        ],
        persistent: true
    },
    content_scripts: [
        {
            matches: ["<all_urls>"],
            js: [
                "content_listener.js",
                "content_scripts.js"
            ],
            run_at: "document_end"
        }
    ],
    browser_action: {
        default_popup: "static/popup.html",
        default_icon: "static/images/icon.png"
    },
    manifest_version: 2
}

export default manifest