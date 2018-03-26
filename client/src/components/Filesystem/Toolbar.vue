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
				<div>Delete <slot/></div>
			</div>
			<div v-on:click="toggleHidden" v-if="toggleHiddenIcon">
				<div><font-awesome-icon v-bind:icon="toggleHiddenIcon" /></div>
				<div>Show hidden files</div>
			</div>
		</div>
	</header>
</template>

<script>
import shared from '@/shared'
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
	display:			flex;
	align-items: 	center;
	min-height: 	100px;
}

.header > div {
	cursor:		pointer;
	color:		#fff;
	padding:	10px;
}

.toolbar {
	justify-content: 	space-between;
	padding: 					0 5px 0 5px;
	font-size: 				5vw;
}

.optionsbar {
	justify-content: space-around;
	flex-wrap: wrap;
	font-size: 4vw;
}

.optionsbar > div {
	text-align: center;
}

.status-bar {
	background: rgb(29, 49, 72);
	color: 			#fff;
	font-size: 	5vw;
	padding: 		10px;
	text-align: center;
}

@media screen and (max-width: 540px) {
  .toolbar {
     font-size: 7vw;
  }

	.optionsbar {
		font-size: 6vw;
	}
}

</style>
