<template>
	<section class="wrapper">
		<nav class="options" v-show="this.errorMessage == undefined">
			<div class="noselect" v-on:click="toggleFavorite" v-bind:class="{active: isFavorite}">
				<font-awesome-icon icon="star"/>
				<div class="title">Set as favorite</div>
			</div>

			<div class="noselect" v-on:click="showAdvancedOptions = !showAdvancedOptions" v-bind:class="{greyed: showAdvancedOptions}">
				<font-awesome-icon icon="cogs"/>
				<div class="title">Show advanced options</div>
			</div>
		</nav>
		<nav class="options" v-show="showAdvancedOptions">
			<div class="noselect" v-on:click="showHidden = !showHidden">
				<font-awesome-icon v-bind:icon="(showHidden) ? 'toggle-on' : 'toggle-off'"/>
				<div class="title">Show hidden files</div>
			</div>

			<div class="noselect" v-on:click="makeFolder">
				<font-awesome-icon icon="folder"/>
				<div class="title">New folder</div>
			</div>

			<div class="noselect" v-on:click="didClickDelete = !didClickDelete" v-bind:class="{greyed: didClickDelete}">
				<font-awesome-icon icon="trash"/>
				<div class="title">Delete folder</div>
			</div>
		</nav>

		<component v-bind:is="middleComponent"
							 v-bind:directories="directories"
							 v-bind:files="files"
							 v-bind:showHidden="showHidden"
							 v-bind:prettyPath="prettyPath"
							 v-bind:content="errorMessage">
		</component>

		<component v-bind:is="bottomComponent"
							 v-bind:cancelCallback="didSelectCancel"
							 v-bind:confirmCallback="didSelectConfirm">
		</component>

	</section>

</template>

<script>
import shared from '@/shared'
import Spinner from '@/components/Common/Spinner'
import Content from '@/components/Common/Content'
import ConfirmButton from '@/components/Common/ConfirmButton'
import DirectoryListing from '@/components/Browser/DirectoryListing'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
	props: { path: { default: '/' } },
	name: 'Browser',
	components: { FontAwesomeIcon, DirectoryListing, Spinner, Content, ConfirmButton },
	watch: {
		'$route' (to, from) {
			this.middleComponent = 'Spinner';
			// Remove any old stuff before changing view
			this.didClickDelete = false;
			this.showAdvancedOptions = false;
			this.isFavorite = this.$CookieManager.getBookmark() == this.prettyPath;
			let path = (to.params.path != undefined) ? decodeURIComponent(to.params.path) : '/';
			this.$APIManager.listDirectory(path, this.didFinishRequest);
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
				this.$CookieManager.clearBookmark();
			} else {
				this.$CookieManager.setBookmark(this.prettyPath);
			}

			this.isFavorite = !this.isFavorite;
		},
		/**
		 * Invoked by listDirectory requests.
		 *
		 * @param  {Object} data The response data.
		 */
		didFinishRequest: function (response) {
			if (response.status == 1) {
				this.files = response.result.files;
				this.directories = response.result.directories;
				this.middleComponent = 'DirectoryListing';
			} else {
				this.errorMessage = response.error;
				this.middleComponent = 'Content';
			}
		},
		/**
		 * Shows the confirmation dialog.
		 * @param  {Boolean} status True to show the dialog, otherwise false.
		 */
		showConfirmation: function (status) {
			this.didClickDelete = status;
			this.bottomComponent = (status) ? 'ConfirmButton' : '';
		},
		/**
		 * Invoked when user clicks the cancel button on the confirm dialog.
		 */
		didSelectCancel: function () {
			this.showConfirmation(false);
		},
		/**
		 * Invoked when user clicks the confirm button on the confirm dialog.
		 */
		didSelectConfirm: function () {
			this.$APIManager.deleteFile(this.prettyPath, response => {
				if (response.status == 1) {
					this.goBack();
				} else {
					this.errorMessage = response.error;
					this.middleComponent = 'Content';
				}
			});
		},
		/**
		 * Invoked when user clicks the New Folder button.
		 */
		makeFolder: function () {
			let folderName = prompt("Set folder name:");
			if (folderName != null && folderName != "") {
				let directory = this.prettyPath + '/' + folderName;

				this.$APIManager.createFolder(directory, response => {
					if (response.status == 1) {
						this.$router.push({
							name: 'Directory',
							params: { path: encodeURIComponent(response.result.path) }
						});
					} else {
						alert(response.error);
					}
				});
			}
		}
	},
	data() {
		return {
			files: [],
			directories: [],
			middleComponent: 'Spinner',
			bottomComponent: '',
			showHidden: this.$CookieManager.loadCookie('showHidden'),
			isFavorite: this.$CookieManager.getBookmark() == this.path,
			didClickDelete: false,
			showAdvancedOptions: false,
			toggleHiddenIcon: 'toggle-off',
			errorMessage: undefined
		}
	},
	created () {
		this.goBack			= shared.goBack.bind(this);
		this.startsWith = shared.startsWith;

		this.$APIManager.listDirectory(this.prettyPath, this.didFinishRequest);
	}

}
</script>

<style scoped>

.options .title {
	font-size: 3.5vw;
}

</style>
