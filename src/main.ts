/// <reference types="@types/office-js" />
/// <reference path="./LogicCore/Instances/index.d.ts"/>
/// <reference path='./LogicCore/Debug/Log.d.ts'/>
/// <reference path='./types/SheetManager.d.ts'/>
/** https://github.com/Microsoft/TypeScript/issues/11420 */

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/GraphicCore/Router'
import { store } from '@/StorageCore'
import '@/GraphicCore/framework/style.scss'
import '@/GraphicCore/Directives/DragDropTouch.js'
import VueNestable from 'vue-nestable'
//https://github.com/rhwilr/vue-nestable#vue-nestable
Vue.use(VueNestable)
import Vue2TouchEvents from 'vue2-touch-events'
//https://www.npmjs.com/package/vue2-touch-events
import 'vue-swatches/dist/vue-swatches.min.css'
import VueTour from 'vue-tour'
import VueI18n from 'vue-i18n'
import { Languages } from '@/LogicCore/Languages/Languages'
import { LangMessage } from '@/LogicCore/Languages'
require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)
Vue.use(VueI18n)
Vue.use(Vue2TouchEvents)
Vue.config.productionTip = false
let vm: Vue

export const i18n = new VueI18n({
	locale: Languages.rus, // set locale
	messages: LangMessage,
})

/**for custom type definitions need to add to types in tsconfig "./src/types",
 * "node_modules/@types"
 */
//Check were we are
let infoGlobal = window.sessionStorage['hostInfoValue']
const sourceExcel: SheetElementsInterface.outsideApp = 'excelDesktop'
const sourceBrowser: SheetElementsInterface.outsideApp = 'browser'
switch (infoGlobal == undefined) {
	case true: //outside office client
		console.log("I'm an outsider")
		vm = new Vue({
			i18n,
			router,
			store,
			render: function(h) {
				return h(App)
			},
		}).$mount('#app')
		vm.$children[0].$data.sourceApp = sourceBrowser
		break
	default:
		//we are in office client
		console.log("I'm an office man")
		Office.onReady(function(info) {
			vm = new Vue({
				el: '#app',
				i18n,
				router,
				store,
				render: h => h(App),
			})
			vm.$children[0].$data.sourceApp = sourceExcel
			vm.$children[0].$data.hostInfo = info
		})
		break
}
