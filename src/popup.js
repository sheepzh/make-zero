import Vue from 'vue'
import Popup from './view/popup'

const vue = new Vue({
    el: '#app',
    render: h => h(Popup)
})

console.log(vue)