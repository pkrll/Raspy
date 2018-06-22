<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}

</script>

<style>

body, html {
  margin: 0;
  padding: 0;
}

body {
  background: #000;
}

#app {
  color:                    #fff;
  font-family:              'Avenir', Helvetica, Arial, sans-serif;
  height:                   100vh;
  min-height:               100vh;
  text-align:               center;
  -moz-osx-font-smoothing:  grayscale;
   -webkit-font-smoothing:  antialiased;
}
</style>
