import Main from './layout'
import installRouter from './router'
import { App, createApp } from 'vue'
import 'element-plus/lib/theme-chalk/index.css'
import './styles/index.scss' // global css

const app: App = createApp(Main)

installRouter(app)

app.mount('#app')