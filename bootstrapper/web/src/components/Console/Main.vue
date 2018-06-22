<template>
	<section>
		<transition name="slide-menu">
			<component 	v-bind:is="overlayComponent"
									v-on:showConsole="showConsole"
									v-on:clearConsole="clearConsole"
                  v-bind:logs="logs"></component>
		</transition>
  </section>
</template>

<script>

import { methods } from '@/components/Console/Main.js'
import Menu from '@/components/Menu/Main'
import Console from '@/components/Console/Console'

export default {
  name: 'ConsoleMain',
  components: { Menu, Console },
  data: function() {
    return {
      overlayComponent: 'Console',
      menuHidden: true,
      logs: []
    }
  },
  methods: methods
}
</script>

<style scoped>

.slide-enter-active {
	transition: opacity 0.2s;
}

.slide-enter {
	opacity: 0;
}

.slide-menu-leave-active,
.slide-menu-enter-active {
	transition: 0.5s;
}

.slide-console-enter-active {
	transition: 0s;
}

.slide-console-leave-active {
	transition: 0s;
}

.slide-menu-enter {
	transform: translate(0%, 100%);
}

.slide-menu-leave-to {
	transform: translate(0%, 100%);
}

.slide-console-enter {
	transform: translate(0%, 0%);
}

.slide-console-leave-to {
	transform: translate(0%, 0%);
}

section {
  display: flex;
  justify-content: center;
}

</style>
