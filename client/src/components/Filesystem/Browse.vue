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

		<component v-bind:is="middleComponent"
							 v-bind:directories="directories"
							 v-bind:files="files"
							 v-bind:showHidden="showHidden"
							 v-bind:prettyPath="prettyPath">
		</component>

		<component v-bind:is="bottomComponent"
							 v-bind:cancelCallback="cancelDeleteFile"
							 v-bind:confirmCallback="deleteFile">
		</component>

	</section>

</template>

<script>
import shared from '@/common'
import ConfirmButton from '@/components/ConfirmButton'
import DirectoryListing from '@/components/Filesystem/DirectoryListing'
import Spinner from '@/components/Spinner'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { trashalt, cog, toggleon, toggleoff } from '@fortawesome/fontawesome-free-solid'

export default {
	props: { path: { default: '/' } },
	name: 'Browse',
	components: { FontAwesomeIcon, DirectoryListing, Spinner, ConfirmButton },
	watch: {
		'$route' (to, from) {
			this.middleComponent = 'Spinner';
			// Remove any old stuff before changing view
			this.didClickDelete = false;
			this.isFavorite = this.$bookmarker.get() == this.path;

			let path = (to.params.path != undefined) ? decodeURIComponent(to.params.path) : '/';

			this.browseDirectory(path, function() {
				this.middleComponent = 'DirectoryListing';
			}.bind(this));
		},
		'didClickDelete' () {
			this.showConfirmation(this.didClickDelete);
		}
  },
	computed: {

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
			middleComponent: 'DirectoryListing',
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

</style>
