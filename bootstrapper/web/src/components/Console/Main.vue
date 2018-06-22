<template>
	<section id="container">
		<transition name="slide-menu">
			<component 	v-bind:commandInprogress="commandInprogress"
                  v-bind:is="overlayComponent"
                  v-bind:logs="logs"
                  v-on:call="performCommand"
                  v-on:showConsole="showConsole"
									v-on:clearConsole="clearConsole">
                  </component>
		</transition>
  </section>
</template>

<script>
import { data, methods, created } from '@/components/Console/Main.js'
import Menu from '@/components/Menu/Main'
import Console from '@/components/Console/Console'

export default {
  name: 'ConsoleMain',
  components: { Menu, Console },
  data: data,
  methods: methods,
  created: created
}
</script>

<style scoped src='@/components/Console/Main.css'>
</style>
