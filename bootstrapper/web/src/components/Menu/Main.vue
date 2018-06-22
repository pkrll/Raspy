<template>
	<section class="container">
		<div id="updateMenu">
			<div v-on:click="$emit('showConsole', true)">
				<span><font-awesome-icon icon="terminal"/><br/>Show Console</span>
			</div>
			<div v-on:click="call('update')" v-bind:class="{inactive: commandInprogress}">
				<span><font-awesome-icon icon="cloud-download-alt"/><br/>Update</span>
			</div>
			<div class="grouped">
				<div v-on:click="call('restart')" v-bind:class="{inactive: commandInprogress}">
					<span><font-awesome-icon icon="redo-alt"/><br/>Restart</span>
				</div>
				<div v-on:click="call('stop')" v-bind:class="{inactive: commandInprogress}">
					<span><font-awesome-icon icon="plug"/><br/>Stop</span>
				</div>
			</div>
			<div v-on:click="call('shutdown')" v-bind:class="{inactive: commandInprogress}">
				<span><font-awesome-icon icon="power-off"/><br/>Exit Updater</span>
			</div>
		</div>
	</section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTerminal, faCloudDownloadAlt, faPowerOff, faRedoAlt, faPlug } from '@fortawesome/free-solid-svg-icons'

library.add(faTerminal, faCloudDownloadAlt, faPowerOff, faRedoAlt, faPlug)

export default {
  name: 'Menu',
  props: ['commandInprogress'],
  methods: {
    call: function (command) {
      if (this.commandInprogress) {
        return;
      }

      this.$emit('call', command);
    }
  }
}
</script>

<style scoped src="@/components/Menu/Main.css">
</style>
