<template>
	<section class="container">
		<div id="updateMenu">
			<div v-on:click="$emit('showConsole', true)">
				<span><font-awesome-icon icon="terminal"/><br/>Show Console</span>
			</div>
			<div v-on:click="$emit('call', 'update')">
				<span><font-awesome-icon icon="cloud-download-alt"/><br/>Update</span>
			</div>
			<div class="grouped">
				<div v-on:click="$emit('call', 'restart')">
					<span><font-awesome-icon icon="redo-alt"/><br/>Restart</span>
				</div>
				<div v-on:click="$emit('call', 'stop')">
					<span><font-awesome-icon icon="plug"/><br/>Stop</span>
				</div>
			</div>
			<div v-on:click="$emit('call', 'shutdown')">
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
  name: 'Menu'
}
</script>

<style scoped>

.container {
	position: 								fixed;
	color: 										#2c3e50;
	font-family: 							'Avenir', Helvetica, Arial, sans-serif;
	margin-top: 							0;
	height: 									100%;
	text-align: 							center;
	width: 										100%;
	-moz-osx-font-smoothing: 	grayscale;
	-webkit-font-smoothing:		antialiased;
	z-index: 99;
}

#updateMenu {
	background: 		#2c3e50;
	color: 					#fff;
	display: 				flex;
	flex-direction: column;
	font-size: 			3vw;
	height: 				100%;
	transition: 		0.5s;
	width: 					100%;
}

#updateMenu > div {
	align-items: 			center;
	display: 					flex;
	height: 					inherit;
	justify-content: 	center;
}

#updateMenu > div {
	border-bottom: 1px solid #fff;
}

#updateMenu div:hover {
	cursor: pointer;
}

#updateMenu div.grouped {
	align-items: 			stretch;
}

#updateMenu div.grouped > div {
	display: 				flex;
	flex: 					1;
	flex-direction: column;
	align-items: 		center;
	justify-content: center;
	width: 					100%;
}

#updateMenu div.grouped > div:first-child {
	border-right: 1px solid #fff;
}

#updateMenu> div:last-child {
	border: none;
}

@media only screen and (min-device-width: 320px)
									 and (max-device-width: 736px)
									 and (orientation: portrait) {

	#updateMenu {
		font-size: 8vw;
	}

}

@media only screen and (min-device-width: 736px)
									 and (max-device-width: 1024px)
									 and (orientation: portrait) {

	#updateMenu {
		font-size: 8vw
	}

}
</style>
