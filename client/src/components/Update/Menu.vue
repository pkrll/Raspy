<template>
	<section class="container">
		<div id="updateMenu">
			<div v-on:click="$emit('toggleConsole', true)">
				<span><font-awesome-icon icon="terminal"/><br/>Show Console</span>
			</div>
			<div onclick="call('update')">
				<span><font-awesome-icon icon="cloud-download-alt"/><br/>Update</span>
			</div>
			<div class="grouped" onclick="call('update')" style="">
				<div onclick="call('restart')"><span><font-awesome-icon icon="redo-alt"/><br/>Restart</span></div>
				<div onclick="call('stop')"><span><font-awesome-icon icon="plug"/><br/>Stop</span></div>
			</div>
			<div onclick="shutdown()">
				<span><font-awesome-icon icon="power-off"/><br/>Shutdown Updater</span>
			</div>
		</div>
	</section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { terminal, clouddownloadalt, poweroff, redoalt, plug } from '@fortawesome/fontawesome-free-solid'

export default {
	name: 'UpdateMenu',
	components: { FontAwesomeIcon },
	data() {
		return {
			show: false
		}
	},
}
</script>

<style scoped>
* {
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.container {
	position: absolute;
	color: 										#2c3e50;
	font-family: 							'Avenir', Helvetica, Arial, sans-serif;
	height: 									100vh;
	margin-top: 							0;
	text-align: 							center;
	width: 										100%;
	-moz-osx-font-smoothing: 	grayscale;
	-webkit-font-smoothing:		antialiased;
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

#updateMenu div {
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
	justify-content: space-around;
}

#updateMenu div.grouped > div {
	display: 				flex;
	flex-direction: column;
	height: 				100%;
	width: 					100%;
}

#updateMenu div.grouped > div:first-child {
	border-right: 1px solid #fff;
}

#updateMenu> div:last-child {
	border: none;
}
</style>
