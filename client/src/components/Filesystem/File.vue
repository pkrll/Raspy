<template>
	<div>
		<div class="status-bar">
			{{prettyPath(path)}}
		</div>

		<header class="header toolbar">
			<div class="navigation" v-on:click="goBack">
				<font-awesome-icon icon="arrow-alt-circle-left" /> Back
			</div>

			<div class="options" v-on:click="showOptions = !showOptions">
				<font-awesome-icon icon="cog"/> Options
			</div>
		</header>

		<header class="header optionsbar" v-if="showOptions">
			<div v-on:click="showConfirmation = true">
				<div><font-awesome-icon icon="trash-alt" /></div>
				<div>Delete file</div>
			</div>
		</header>
		<ConfirmButton v-show="showConfirmation" :cancelCallback="cancelDeleteFile" :confirmCallback="deleteFile"></ConfirmButton>
	</div>
</template>

<script>
import shared from '@/common'
import ConfirmButton from '@/components/ConfirmButton'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { trashalt, cog, arrowaltcircleleft } from '@fortawesome/fontawesome-free-solid'

export default {
	props: ['path'],
	name: "File",
	components: {
    FontAwesomeIcon, ConfirmButton
  },
	data() {
		return {
			showOptions: false,
			showConfirmation: false
		}
	},
	created () {
		this.deleteFile 			= shared.deleteFile.bind(this);
		this.cancelDeleteFile = shared.cancelDeleteFile.bind(this);
		this.goBack 					= shared.goBack.bind(this);
		this.prettyPath 			= shared.prettyPath;
		// HTTP.get('filesystem/file' + this.path).then(
		// 	response => {
		// 		console.log(response);
		// 	}
		// ).catch(e => {
		// 	console.log("Error " + e);
		// });
	}

}
</script>

<style scoped>

.header {
	background: 	rgb(229, 73, 95);
	color: 				#fff;
	font-size: 		1.2em;
	display:			flex;
	align-items: 	center;
}

.header > div {
	cursor:		pointer;
	color:		#fff;
	padding:	10px;
}

.toolbar {
	justify-content: space-between;
}

.optionsbar {
	justify-content: space-around;
	flex-wrap: wrap;
}

.optionsbar > div {
	text-align: center;
}

.status-bar {
	background: rgb(29, 49, 72);
	color: 			#fff;
	padding: 		10px;
	text-align: center;
}
</style>
