/// <reference types="@types/office-js" />
/** https://github.com/Microsoft/TypeScript/issues/11420 */ 
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/GraphicCore/Router'
import store from '@/StorageCore'

Vue.config.productionTip = false
let vm: Vue | undefined = undefined
/**for custom type definitions need to add to types in tsconfig "./src/types", 
 * "node_modules/@types"
 */
//Check were we are
let infoGlobal = window.sessionStorage['hostInfoValue']
switch (infoGlobal == undefined){
  case true: //outside office client
    console.log("I'm an outsider");
    vm = new Vue({
      router,
      store,
      render: function (h) { return h(App) }
    }).$mount('#app');
    break;
  default: //we are in office client
    console.log("I'm an office man");
    (function(){
      Office.onReady(function(info){
        infoGlobal = info
        vm = new Vue({
          el: '#app',
          router,
          store,
          render: h => h(App)
        })
      });
    })()
  break;
}

if(vm !== undefined){
  vm.$root.$store.commit('setExcelUsingInfo',infoGlobal)
  console.log(vm.$root.$store)
}



