<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  watch:{
    $route(to,from){
      //console.log(to.path, from.path);
      if(to.path == "/login")
      {
        sessionStorage.clear();
      }
    }
  },
}
</script>

<style scoped>
  
</style>
