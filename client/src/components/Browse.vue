<template>
	<div>
		<div class="toolbar" v-on:click="toggleHidden">
			<font-awesome-icon v-bind:icon="toolbar.icon"/> {{toolbar.text}}
		</div>
		<nav class="file-list">
			<div v-for="directory in directories" class="directory" v-if="showHidden || !startsWith(directory.name, '.')">
				<router-link v-bind:to="'/filesystem/browse' + directory.path">
					<font-awesome-icon icon="folder-open"/> {{directory.name}}
				</router-link>
			</div>
			<div v-for="file in files" class="file" v-if="showHidden || !startsWith(file.name, '.')">
				<router-link v-bind:to="'/filesystem/file' + file.path">
					<font-awesome-icon icon="file"/> {{file.name}}
				</router-link>
			</div>
		</nav>
	</div>
</template>

<script>
import {HTTP} from '../http-common'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { folderopen, file, eye, eyeslash } from '@fortawesome/fontawesome-free-solid'

export default {
	name: 'Browse',

	components: {
    FontAwesomeIcon
  },
	methods: {
		startsWith: function (value, searchString) {
	    if (!value) return false;
	    value = value.toString();
	    return value.charAt(0) === searchString.toString();
	  },

		toggleHidden: function () {
			if (this.showHidden) {
				this.toolbar = {icon: 'eye-slash', text: 'Show hidden files'},
				this.showHidden = false;
			} else {
				this.toolbar = {icon: 'eye', text: 'Hide hidden files'},
				this.showHidden = true;
			}
		}

	},

	data() {
		return {
			showHidden: false,
			toolbar: {icon: 'eye-slash', text: 'Show hidden files'},
			files: [],
			directories: []
		}
	},

	created() {
		HTTP.get('filesystem/list/').then(
			response => {
				this.files = response.data.files;
				this.directories = response.data.directories;
			}
		).catch(e => {
			console.log("ERROR " + e);
		})
	}

}
</script>

<style scoped>

.toolbar {
	background: rgb(92, 107, 158);
	border-top:	1px solid #000;
	color: 			#fff;
	cursor: 		pointer;
	padding:		10px;
}

.file-list div {
	background: rgb(115, 186, 208);
	border-top:	1px solid #000;
}

.file-list a {
	display: 					block;
	color: 						#fff;
	font-size: 				1.2em;
	text-decoration: 	none;
	padding: 					10px;
	width: 						100%;
}

</style>
