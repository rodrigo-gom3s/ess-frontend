import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import { io } from 'socket.io-client'

const app = createApp(App)

axios.defaults.baseURL = 'http://127.0.0.1:5000/api'

app.use(createPinia())
app.use(router)
app.mount('#app')
