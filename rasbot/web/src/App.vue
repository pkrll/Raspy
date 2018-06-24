<template>
  <div id="app">
    <transition name="route-change" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

body, html {
  margin:   0;
  padding:  0;
  height: 100%;
}

body {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

#app {
  background:               rgb(45, 49, 57);
  color:                    #ffffff;
  font-family:              'Avenir', Helvetica, Arial, sans-serif;
  height:                   inherit;
  text-align:               center;
  -webkit-font-smoothing:   antialiased;
  -moz-osx-font-smoothing:  grayscale;
}
</style>
