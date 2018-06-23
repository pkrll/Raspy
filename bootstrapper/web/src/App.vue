<template>
  <div id="app">
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  created: function () {
    if (this.$root.isLoggedIn == false) {
      this.$root._router.push('/');
    }
  }
}

</script>

<style>

body, html {
  margin: 0;
  padding: 0;
}

body {
  background: #2c3e50;
}

#app {
  color:                    #fff;
  font-family:              'Avenir', Helvetica, Arial, sans-serif;
  text-align:               center;
  -moz-osx-font-smoothing:  grayscale;
   -webkit-font-smoothing:  antialiased;
}
</style>
