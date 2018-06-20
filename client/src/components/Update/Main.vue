<template>
	<transition name="slide" v-on:after-enter="afterEnter">
		<component 	v-bind:is="component"
		v-bind:logs="consolelogs"
		v-on:toggleConsole="toggleConsole">
	</component>
</transition>
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
			consolelogs: [],
			component: 'Menu'
		}
	},
	sockets: {
		connect() {
			console.log("Is connect");
		}
	},
	methods: {
		afterEnter: function (el) {
			this.consolelogs = this.logs;
		},
		toggleConsole: function (value) {
			this.component = (value) ? 'Console' : 'Menu';
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
	transition: 1s;
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
