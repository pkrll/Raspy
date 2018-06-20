<template>
	<section>
		<transition name="slide">
			<component 	v-bind:is="overlayComponent"
										v-on:call="call"
										v-on:showConsole="showConsole"></component>
		</transition>
		<component 	v-bind:is="bottomComponent"
									v-on:showConsole="showConsole"
									v-on:clearConsole="clearConsole"
								v-bind:logs="logs"></component>
	</section>
</template>

<script>
import Menu from '@/components/Update/Menu'
import Console from '@/components/Update/Console'

export default {
	name: 'Update',
	components: { Menu, Console },
	data() {
		return {
			logs: [],
			overlayComponent: 'Menu',
			bottomComponent: 'Console'
		}
	},
	methods: {
		/**
		 * Requests the server to perform a specific command.
		 *
		 * @param  String command 	The command to perform
		 */
		call: function (command) {
			this.logs.push("$ " +command);

			switch (command) {
				case 'update':
					this.$APIManager.updateRaspy(this.didReceiveResponse);
					this.showConsole(true);
					break;
				case 'restart':
					this.$APIManager.restartRaspy(this.didReceiveResponse);
					break;
				case 'stop':
					this.$APIManager.stopRaspy(this.didReceiveResponse);
					break;
				default:
					break;
			}
		},
		/**
		 * Clears the console.
		 */
		clearConsole: function () {
			this.logs = [];
		},
		/**
		 * Toggles the console.
		 *
		 * @param  Boolean value 	True to show the console, otherwise false.
		 */
		showConsole: function (value) {
			this.overlayComponent = (value) ? '' : 'Menu';
		},
		/**
		 * Invoked when the server sends the console history.
		 *
		 * @param  {Object} data 	The console log from the server.
		 */
		didReceiveConsoleHistory: function (data) {
			for (let log of data.history) {
				this.logs.push(log.message);
			}
		},
		/**
		 * Invoked when the server sends a respond to a command.
		 *
		 * @param  {Object} response 	The response.
		 */
		didReceiveResponse: function (response) {
			this.logs.push(response.data);
		}
	},
	created: function() {
		this.$root.fullScreen = true;
	},
	mounted: function () {
		this.$APIManager.loadConsoleHistory(this.didReceiveConsoleHistory);
	}
}
</script>

<style>

body {
	background: #000;
}

.slide-leave-active,
.slide-enter-active {
	transition: 0.5s;
}
.slide-enter {
	transform: translate(0%, 100%);
}
.slide-leave-to {
	transform: translate(0%, 100%);
}

@media only screen and (min-device-width: 320px)
									 and (max-device-width: 736px)
									 and (orientation: portrait) {

	#console {
		font-size: 6vw;
	}

	#updateMenu {
		font-size: 8vw;
	}

	#consoleBottomPanel div {
		font-size: 4vw;
	}

	#consoleBottomPanel div i {
		font-size: 5vw;
	}

}


</style>
