<template>
  <div id="app">
		<app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
	components: {
		'app-header': Header
	}
}
</script>

<style>

body {
	background: rgb(23,173,145);
	margin: 		0;
}

#app {
	color: 										#2c3e50;
  font-family:							'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing:	antialiased;
  -moz-osx-font-smoothing:	grayscale;
}

</style>
