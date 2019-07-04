import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
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
    //const Office = window.Office
    (function(){
      Office.onReady(function(info){
        new Vue({
          el: '#app',
          //components: {App},
          //template: '<App/>',
          router,
          store,
          created: function () {
          },
          render: function (h) { return h(App) }
        }).$mount('#app');
      });
    })()
  break;
}
