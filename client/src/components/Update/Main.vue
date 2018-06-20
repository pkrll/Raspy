<template>
	<section>
		<transition name="slide">
			<component 	v-bind:is="overlayComponent" v-on:showConsole="showConsole"></component>
		</transition>
		<component 	v-bind:is="bottomComponent" v-bind:logs="logs" v-on:showConsole="showConsole"></component>
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
	sockets: {
		connect() {
			console.log("Is connect");
		}
	},
	methods: {
		showConsole: function (value) {
			this.overlayComponent = (value) ? '' : 'Menu';
		},
		didReceiveLogDump: function (data) {
			for (let log of data.data) {
				this.logs.push(log.message);
			}
		},
		didReceiveLog: function (data) {
			this.logs.push(data.data);
		}
	},
	created() {
		this.$socket.on('updater/log/dump', this.didReceiveLogDump);
		this.$socket.on('updater/log', this.didReceiveLog);
		this.$root.fullScreen = true;
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
