<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
/*  
  export default {
    router,
    store

  //(function (){
  //  Office.onReady();
    //Office.onReady(function(info) {
      /*if (info.host === Office.HostType.Excel) {
          // Do Excel-specific initialization (for example, make add-in task pane's
          // appearance compatible with Excel "green").
      }
      if (info.platform === Office.PlatformType.PC) {
          // Make minor layout changes in the task pane.
      }*/
      //console.log(`Office.js is now ready in ${info.host} on ${info.platform}`);
    //});
  //})();
//  }
//
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
