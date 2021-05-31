import { App, createApp } from 'vue'
import Popup from './layout/index'
import installRouter from './router'
import 'element-plus/lib/theme-chalk/index.css'

import './styles' // global css

const app: App = createApp(Popup)

installRouter(app)

app.mount('#app')