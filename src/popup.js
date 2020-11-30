import Vue from 'vue'
import Popup from './view/popup'
import './view/plugin/vuetify'

const vue = new Vue({
    el: '#app',
    render: h => h(Popup)
})
