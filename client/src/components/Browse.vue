<template>
	<div>
		<div class="toolbar" v-on:click="toggleHidden">
			<font-awesome-icon v-bind:icon="toolbar.icon"/> {{toolbar.text}}
		</div>
		<nav class="file-list">
			<div v-for="directory in directories" class="directory" v-if="showHidden || !startsWith(directory.name, '.')" v-on:click="browseDirectory(directory.path)">
				<font-awesome-icon icon="folder-open"/> {{directory.name}}
			</div>
			<div v-for="file in files" class="file" v-if="showHidden || !startsWith(file.name, '.')" v-on:click="viewFile(file.path)">
				<font-awesome-icon icon="file"/> {{file.name}}
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
		/**
		 * Browse the specified path.
		 *
		 * @param  {[type]} path The path to list.
		 */
		browseDirectory: function (path) {
			HTTP.get('filesystem/list' + path).then(
				response => {
					this.files = response.data.files;
					this.directories = response.data.directories;
				}
			).catch(e => {
				console.log("ERROR " + e);
			})
		},
		/**
		 * View the specified file.
		 *
		 * @param  {[type]} path Path to the file to view.
		 */
		viewFile: function (path) {

		},
		/**
		 * Checks if a string starts with a specific character.
		 *
		 * @param  {[type]} value     The string to check.
		 * @param  {[type]} character The character to check against.
		 * @return Boolean            True if value starts with character, otherwise false.
		 */
		startsWith: function (value, character) {
			if (!value) return false;
			value = value.toString();
			return value.charAt(0) === character.toString();
		},
		/**
		 * Toggles hidden files and changes the toolbar.
		 */
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
		this.browseDirectory('/');
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

.file-list div {
	color: 						#fff;
	font-size: 				1.2em;
	text-decoration: 	none;
	padding: 					10px;
	width: 						100%;
}

</style>
