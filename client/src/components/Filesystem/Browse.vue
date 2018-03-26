<template>
	<section class="wrapper">
		<nav class="options">
			<div class="noselect" v-on:click="toggleFavorite" v-bind:class="{active: isFavorite}">
				<font-awesome-icon icon="star"/>
				<div class="title">Set as favorite</div>
			</div>

			<div class="noselect" v-on:click="showHidden = !showHidden">
				<font-awesome-icon v-bind:icon="(showHidden) ? 'toggle-on' : 'toggle-off'"/>
				<div class="title">Show hidden files</div>
			</div>

			<div class="noselect" v-on:click="didClickDelete = !didClickDelete">
				<font-awesome-icon icon="trash"/>
				<div class="title">Delete folder</div>
			</div>

		</nav>

		<nav class="file-list-view" v-if="files.length > 0 || directories.length > 0">
			<div class="item" v-if="this.prettyPath != '/'">
				<router-link :to="{ name: 'Browse path', params: {path: encodeURIComponent(this.parentPath) }}">
					<span><font-awesome-icon icon="folder-open"/>&nbsp;&nbsp;...</span>
				</router-link>
			</div>

			<div class="item" v-for="directory in directories" v-if="showHidden || !startsWith(directory.name, '.')">
				<router-link :to="{ name: 'Browse path', params: {path: encodeURIComponent(directory.path) }}">
					<span><font-awesome-icon icon="folder-open"/>&nbsp;&nbsp;{{directory.name}}</span>
				</router-link>
			</div>

			<div class="item" v-for="file in files" v-if="showHidden || !startsWith(file.name, '.')">
				<router-link :to="{ name: 'File', params: {path: encodeURIComponent(file.path) }}">
					<span><font-awesome-icon icon="file"/>&nbsp;&nbsp;{{file.name}}</span>
				</router-link>
			</div>
		</nav>
		<nav class="file-list-view" v-else>
			<div class="item" v-if="this.prettyPath != '/'">
				<router-link :to="{ name: 'Browse path', params: {path: encodeURIComponent(this.parentPath) }}">
					<span><font-awesome-icon icon="folder-open"/>&nbsp;&nbsp;...</span>
				</router-link>
			</div>
	  </nav>

		<component v-bind:is="bottomComponent" v-bind:cancelCallback="cancelDeleteFile" v-bind:confirmCallback="deleteFile"></component>

	</section>

</template>

<script>
import shared from '@/common'
import ConfirmButton from '@/components/ConfirmButton'
import Toolbar from '@/components/Filesystem/Toolbar'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { trashalt, cog, folderopen, file, toggleon, toggleoff } from '@fortawesome/fontawesome-free-solid'

export default {
	props: { path: { default: '/' } },
	name: 'Browse',
	components: { FontAwesomeIcon, Toolbar, ConfirmButton },
	watch: {
		'$route' (to, from) {
			// Remove any old stuff before changing view
			this.didClickDelete = false;
			this.isFavorite = this.$bookmarker.get() == this.path;

			let path = (to.params.path != undefined) ? decodeURIComponent(to.params.path) : '/';
			this.browseDirectory(path);
		},
		'didClickDelete' () {
			this.showConfirmation(this.didClickDelete);
		}
  },
	computed: {
		/**
		 * Returns the parent path of the current path, or itself if the path is the root folder.
		 *
		 * @return {String} The parent path of the current path.
		 */
		parentPath: function () {
			let _path = this.prettyPath;
			let index = _path.lastIndexOf('/');

			if (index > 0)  return _path.substring(0, index);
			if (index == 0) return '/';

			return _path;
		},
		/**
		 * Converts the current path to a human readable path.
		 *
		 * @return {String} The current path.
		 */
		prettyPath: function () {
			return shared.prettyPath(this.path);
		}
	},
	methods: {
		/**
		 * Toggles the current path as the bookmarked path.
		 */
		toggleFavorite: function () {
			if (this.isFavorite) {
				this.$bookmarker.clear();
			} else {
				this.$bookmarker.set(this.prettyPath);
			}

			this.isFavorite = !this.isFavorite;
		},
		/**
		 * Shows the confirmation dialog.
		 * @param  {Boolean} status True to show the dialog, otherwise false.
		 */
		showConfirmation: function (status) {
			this.bottomComponent = (status) ? 'ConfirmButton' : '';
		}
	},
	data() {
		return {
			files: [],
			directories: [],
			bottomComponent: '',
			showHidden: false,
			isFavorite: this.$bookmarker.get() == this.path,
			didClickDelete: false,
			toggleHiddenIcon: 'toggle-off'
		}
	},
	created () {
		this.browseDirectory 	= shared.browseDirectory.bind(this);
		this.deleteFile 			= shared.deleteFile.bind(this);
		this.cancelDeleteFile = shared.cancelDeleteFile.bind(this);
		this.goBack 					= shared.goBack.bind(this);
		this.startsWith 			= shared.startsWith;

		this.browseDirectory(this.prettyPath);
	}

}
</script>

<style scoped>

.options .title {
	font-size: 2.5vw;
}

.options .active {
	color: yellow;
}

.item a {
	display: 					block;
	color: 						rgb(255,255,255);
	padding: 					0px 0 0px 20px;
	text-decoration: 	none;
	width: 						100%;
}

.item {
	background: rgb(45, 49, 57);
}

.item:nth-child(even) {
	background: rgb(32,35,44);
}

.file-list-view {

}

</style>
