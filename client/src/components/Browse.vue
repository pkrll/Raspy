<template>
	<div>

		<div class="status-bar">
			{{prettyPath}}
		</div>

		<div class="toolbar">
			<div class="navigation" v-on:click="goBack">
				<font-awesome-icon icon="arrow-alt-circle-left" /> Back
			</div>
			<div class="options" v-on:click="toggleHidden">
				<font-awesome-icon v-bind:icon="toolbar.icon"/> {{toolbar.text}}
			</div>
		</div>

		<nav class="file-list" v-if="files.length > 0 || directories.length > 0">
			<div v-for="directory in directories" class="directory" v-if="showHidden || !startsWith(directory.name, '.')">
				<router-link :to="{ name: 'Browses', params: {path: encodeURIComponent(directory.path) }}">
					<font-awesome-icon icon="folder-open"/> {{directory.name}}
				</router-link>
			</div>
			<div v-for="file in files" class="file" v-if="showHidden || !startsWith(file.name, '.')">
				<router-link :to="{ name: '', params: {path: encodeURIComponent(file.path) }}">
					<font-awesome-icon icon="file"/> {{file.name}}
				</router-link>
			</div>
		</nav>

		<div class="file-list empty" v-show="files.length == 0 || directories.length == 0">
			<div>This folder contains no files.</div>
		</div>
	</div>
</template>

<script>
import {HTTP} from '../http-common'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { arrowaltcircleleft, folderopen, file, eye, eyeslash } from '@fortawesome/fontawesome-free-solid'

export default {
	props: {
		path: {
			default: '/'
		}
	},

	name: 'Browse',

	components: {
    FontAwesomeIcon
  },

	watch: {
		'$route' (to, from) {
			let path = (to.params.path != undefined) ? decodeURIComponent(to.params.path) : '/'
			this.browseDirectory(path);
		}
  },

	computed: {
		prettyPath: function () {
			return decodeURIComponent(this.path);
		}
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
		},
		/**
		 * Navigates back to the previous page.
		 */
		goBack: function () {
			this.$root._router.go(-1);
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
		this.browseDirectory(this.path);
	}

}
</script>

<style scoped>

.toolbar {
	background: rgb(229, 73, 95);
	color: #fff;
	font-size: 1.2em;
	display: flex;
	justify-content: space-between;
	align-items: center;
}


.toolbar div:hover {
	color: #000;
}

.navigation {
	color: 			#fff;
	cursor: 		pointer;
	padding:		10px;
}

.options {
	color: 			#fff;
	cursor: 		pointer;
	padding:		10px;
}

.status-bar {
	background: rgb(29, 49, 72);
	color: 			#fff;
	padding: 		10px;
	text-align: center;
}

.file-list div {
	background: 			rgb(115, 186, 208);
	padding: 					10px;
	width: 						100%;
}

.file-list div a {
	display: block;
	cursor:						pointer;
	color: 						#fff;
	font-size: 				1.2em;
	text-decoration: 	none;
	width: 						100%;
}

.file-list div:hover {
	background: 			rgba(115, 186, 208, 0.5);
}

.empty div {
	color: 			#fff;
	font-size: 	1.4em;
	text-align: center;
}

</style>
