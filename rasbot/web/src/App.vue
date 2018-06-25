<template>
  <div id="app">
    <transition name="slide-down">
      <app-header v-if="this.$root.isLoggedIn && !this.$root.fullScreen"></app-header>
    </transition>
    <transition name="route-change" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Header from '@/components/Common/Header/Header.vue';

export default {
  name: 'App',
  components: { 'app-header': Header }
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
