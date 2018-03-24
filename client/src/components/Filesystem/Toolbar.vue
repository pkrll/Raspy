<template>
	<header>
		<div class="status-bar">
			{{prettyPath(path)}}
		</div>

		<div class="header toolbar">
			<div class="navigation" v-on:click="goBack">
				<font-awesome-icon icon="arrow-alt-circle-left" /> Back
			</div>

			<div class="options" v-on:click="showOptions = !showOptions">
				<font-awesome-icon icon="cog"/> Options
			</div>
		</div>

		<div class="header optionsbar" v-if="showOptions">
			<div v-on:click="showConfirmation(true)">
				<div><font-awesome-icon icon="trash-alt" /></div>
				<div>Delete folder</div>
			</div>
			<div v-on:click="toggleHidden" v-if="toggleHiddenIcon">
				<div><font-awesome-icon v-bind:icon="toggleHiddenIcon" /></div>
				<div>Show hidden files</div>
			</div>
		</div>
	</header>
</template>

<script>
import shared from '@/common'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { trashalt, cog, arrowaltcircleleft } from '@fortawesome/fontawesome-free-solid'

export default {
	props: ['path', 'goBack', 'toggleHidden', 'toggleHiddenIcon', 'showConfirmation'],
	name: 'Toolbar',
	components: { FontAwesomeIcon },
	data() {
		return {
			showOptions: false
		}
	},
	created () {
		this.prettyPath = shared.prettyPath;
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
