/// <reference types="@types/office-js" />
import { AppRouter } from '#/consts'
import { App } from '#/widgets/app'
import '@xsoulspace/vuefer/style.css'
import { createApp } from 'vue'
import './registerServiceWorker'

createApp(App).use(AppRouter).mount('#app')
