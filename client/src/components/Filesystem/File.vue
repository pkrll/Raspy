<template>
	<div>
		<Toolbar 	:path="path"
							:goBack="goBack"
							:toggleHidden="toggleHidden"
							:toggleHiddenIcon="toggleHiddenIcon"
							:showConfirmation="showConfirmation">
			File
		</Toolbar>

		<ConfirmButton v-show="didClickDelete" :cancelCallback="cancelDeleteFile" :confirmCallback="deleteFile"></ConfirmButton>
	</div>
</template>

<script>
import shared from '@/common'
import ConfirmButton from '@/components/ConfirmButton'
import Toolbar from '@/components/Filesystem/Toolbar'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { arrowaltcircleleft } from '@fortawesome/fontawesome-free-solid'

export default {
	props: ['path'],
	name: "File",
	components: { FontAwesomeIcon, ConfirmButton, Toolbar },
	methods: {
		showConfirmation: function (status) {
			this.didClickDelete = status;
		}
	},
	data() {
		return {
			didClickDelete: false
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
