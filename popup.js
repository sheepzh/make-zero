'use strict';

// show the all switches
// const storage = chrome.storage.sync

const bg = chrome.extension.getBackgroundPage()

const { Switch, Encryptor } = bg

console.log(bg)

const _eleId = k => `search_checkbox_${k}`

function _switchSearch(key) {
    const on = $(`#${_eleId(key)}`).prop('checked')
    Switch.change(key, on)
}

document.addEventListener('DOMContentLoaded', function () {
    const domains = Switch.domains || []
    domains.forEach(({ key, name }) => {
        const eleId = _eleId(key)
        $('#switch_container').append(
            `<p><input id=${eleId} type="checkbox" ${Switch.isOn(key) ? "checked" : ""}>${name}</input></p>`
        )
        $(`#${eleId}`).on('click', () => _switchSearch(key))
    })

    $('#encrupt_keyword').val(Encryptor.key())
    $('#encrupt_keyword').change(ev => {
        Encryptor.key(ev.target.value)
    })
})

