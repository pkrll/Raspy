<template>
	<div>

		<div class="status-bar">
			{{prettyPath}}
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
			<div>
				<div><font-awesome-icon icon="trash-alt" /></div>
				<div>Delete folder</div>
			</div>
			<div v-on:click="toggleHidden">
				<div><font-awesome-icon v-bind:icon="toggleHiddenIcon" /></div>
				<div>Show hidden files</div>
			</div>
			<div v-on:click="toggleHidden">
				<div><font-awesome-icon v-bind:icon="toggleHiddenIcon" /></div>
				<div>Show hidden files</div>
			</div>
			<div v-on:click="toggleHidden">
				<div><font-awesome-icon v-bind:icon="toggleHiddenIcon" /></div>
				<div>Show hidden files</div>
			</div>
		</header>

		<nav class="file-list" v-if="files.length > 0 || directories.length > 0">
			<div v-for="directory in directories" class="directory" v-if="showHidden || !startsWith(directory.name, '.')">
				<router-link :to="{ name: 'Browses', params: {path: encodeURIComponent(directory.path) }}">
					<span><font-awesome-icon icon="folder-open"/>&nbsp;&nbsp;{{directory.name}}</span>
				</router-link>
			</div>
			<div v-for="file in files" class="file" v-if="showHidden || !startsWith(file.name, '.')">
				<router-link :to="{ name: 'File', params: {path: encodeURIComponent(file.path) }}">
					<span><font-awesome-icon icon="file"/>&nbsp;&nbsp;{{file.name}}</span>
				</router-link>
			</div>
		</nav>
		<nav class="file-list empty" v-else>
			<div>This folder contains no files.</div>
		</nav>
	</div>
</template>

<script>
import {HTTP} from '../../http-common'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { trashalt, cog, arrowaltcircleleft, folderopen, file, toggleon, toggleoff } from '@fortawesome/fontawesome-free-solid'

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
			// TODO: Improve this
			if (this.showHidden) {
				this.toggleHiddenIcon = 'toggle-off';
				this.showHidden = false;
			} else {
				this.toggleHiddenIcon = 'toggle-on';
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
			showOptions: false,
			toggleHiddenIcon: 'toggle-off',
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

.file-list {
	display: 				flex;
	flex-direction: column;
	height: 				100vh;
	width: 					100vw;
}

.file-list div {
	background: 			rgb(115, 186, 208);
	width: 						100%;
	flex: 						1;
	height: 					100px;
	max-height: 			100px;
}

.file-list div a {
	cursor:						pointer;
	color: 						#fff;
	display: 					table;
	font-size: 				7vw;
	height: 					100%;
	text-decoration: 	none;
	width: 						100%;

}

.file-list div a span {
	display: 				table-cell;
	vertical-align: middle;
	padding: 				0 0px 0 30px;
	word-break: 		break-all;
}

.file-list div:hover {
	background: 			rgba(115, 186, 208, 0.5);
}

.empty div {
	color: 			#fff;
	font-size: 	1.4em;
	text-align: center;
}

@media screen and (min-width: 540px) {
  .file-list div a {
     font-size: 6vh;
  }
}

</style>
