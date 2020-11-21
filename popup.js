'use strict';

// show the all switches
const storage = chrome.storage.sync

function _switchSearch(filterUrl) {
    storage.get('domains', ({ domains }) => {
        const value = domains[filterUrl]
        const on = $(`#${_eleId(value.short)}`).prop('checked')
        value.on = on
        storage.set({ domains }, () => {
            console.log(`Switch ${on ? 'on' : 'off'} ${filterUrl}`)
        })
    })
}

const _eleId = k => `search_checkbox_${k}`

document.addEventListener('DOMContentLoaded', function () {
    storage.get('domains', ({ domains }) => {
        Object.keys(domains).forEach((filterUrl) => {
            const value = switches[filterUrl]
            const eleId = _eleId(value.short)
            $('#switch_container').append(
                `<p><input id=${eleId} type="checkbox" ${value.on ? "checked" : ""}>${value.name}</input></p>`
            )
            $(`#${eleId}`).on('click', () => _switchSearch(k))
        })
    })
});