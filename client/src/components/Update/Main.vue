<template>
	<section>
		<transition name="slide-menu">
			<component 	v-bind:is="overlayComponent"
										v-on:call="call"
										v-on:showConsole="showConsole"></component>
		</transition>
		<transition name="slide-console">
			<component 	v-bind:is="bottomComponent"
										v-on:showConsole="showConsole"
										v-on:clearConsole="clearConsole"
										v-bind:logs="logs" v-if="menuHidden"></component>
		</transition>
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
			menuHidden: false,
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
					this.showConsole(true);
					break;
				case 'stop':
					this.$APIManager.stopRaspy(this.didReceiveResponse);
					this.showConsole(true);
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
			this.menuHidden = value;
		},
		/**
		 * Invoked when the server sends the console history.
		 *
		 * @param  {Object} data 	The console log from the server.
		 */
		didReceiveConsoleHistory: function (response) {
			if (response.status == 1) {
				let history = response.history;
				for (let log of history) {
					this.logs.push(log.message);
				}
			} else {
				this.logs.push("An error occured. Could not retrieve logs.");
			}
		},
		/**
		 * Invoked when the server sends a respond to a command.
		 *
		 * @param  {Object} response 	The response.
		 */
		didReceiveResponse: function (response) {
			let message = "";
			if (response.status == 1) {
				message = response.data;
			} else {
				message = response.error;
			}

			this.logs.push(message);
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

<style scoped>

body {
	background: #000;
}

section {
	background: #000;
}

.slide-menu-leave-active,
.slide-menu-enter-active {
	transition: 0.5s;
}

.slide-console-enter-active {
	transition: 0s;
}

.slide-console-leave-active {
	transition: 1s;
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

</style>
