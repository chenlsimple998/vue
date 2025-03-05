import './assets/main.css'
// import 'ant-design-vue/dist/antd.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
const app = createApp(App)

app.use(createPinia())
app.use(Vue3ColorPicker)
app.use(router)
app.use(Antd)


app.mount('#app')
