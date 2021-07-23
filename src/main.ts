/// <reference types="@types/office-js" />
import { AppProvider } from '#/AppProvider'
import '@xsoulspace/vuefer/style.css'
import { createApp } from 'vue'
import './registerServiceWorker'
import { AppRouter } from './router'

createApp(AppProvider)
  .use(AppRouter)
  .mount('#app')
