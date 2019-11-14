import "core-js/stable";
import "regenerator-runtime/runtime";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './bulma.scss'
// Import styles for color picker
import "vue-swatches/dist/vue-swatches.min.css"
//https://stackoverflow.com/questions/36170425/detect-click-outside-element
import "./directives/outside-click";



//Check were we are
const info = window.sessionStorage['hostInfoValue']
switch (info == undefined){
  case true: //outside office client
      console.log("I'm an outsider");
      new Vue({
        router,
        store,
        render: function (h) { return h(App) }
      }).$mount('#app');
    break;
  default: //we are in office client
    console.log("I'm an office man");
    (function(){
      Office.onReady(function(info){
        new Vue({
          el: '#app',
          router,
          store,
          render: h => h(App)
        })
      });
    })()
  break;
}
