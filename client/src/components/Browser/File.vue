<template>
	<section class="wrapper">

		<nav class="options">
			<div class="noselect" v-on:click="goBack">
				<font-awesome-icon icon="arrow-circle-left"/>
				<div class="title">Back</div>
			</div>

			<div class="noselect" v-on:click="downloadFile">
				<font-awesome-icon icon="download"/>
				<div class="title">Download</div>
			</div>

			<div class="noselect" v-on:click="didClickDelete = !didClickDelete"
														v-bind:class="{greyed: didClickDelete}">
				<font-awesome-icon icon="trash"/>
				<div class="title">Delete file</div>
			</div>

		</nav>

		<component v-bind:is="middleComponent"
							 v-bind:file="file"
							 v-bind:content="text">
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
import FileDetails from '@/components/Browser/FileDetails'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { arrowcircleleft, download, trash, file } from '@fortawesome/fontawesome-free-solid'

export default {
	props: ['path'],
	name: "File",
	components: { FontAwesomeIcon, Spinner, Content, ConfirmButton, FileDetails },
	watch: {
		'didClickDelete' () {
			this.showConfirmation(this.didClickDelete);
		}
	},
	methods: {
		/**
		 * Invoked by viewFile requests.
		 *
		 * @param  {Object} data The response data.
		 */
		didFinishRequest: function (response) {
			this.file = {
				filename: response.result.filename,
				metadata: response.result.metadata
			};
			if (response.status == 1) {
				this.middleComponent = 'FileDetails';
			} else {
				this.text = response.error;
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
			this.middleComponent = 'Spinner';

			this.$APIManager.deleteFile(this.prettyPath, response => {
				if (response.status == 1) {
					this.goBack();
				} else {
					this.text = response.error;
					this.middleComponent = 'Content';
				}
			});
		},
		/**
		 * Downloads the current file.
		 */
		downloadFile: function () {
			this.middleComponent = 'Spinner';

			this.$APIManager.downloadFile(this.prettyPath, this.file.filename, response => {
				if (response.status == 1) {
					this.middleComponent = 'FileDetails';
				} else {
					this.text = "Could not download file."
					this.middleComponent = 'Content';
				}
			});
		}
	},
	data: function () {
		return {
			didClickDelete: false,
			middleComponent: 'Spinner',
			bottomComponent: '',
			file: undefined,
			text: 'Loading...'
		}
	},
	created: function () {
		this.goBack 			= shared.goBack.bind(this);
		this.prettyPath		= shared.prettyPath(this.path);
		this.convertSize	= shared.bytesToHumanReadable;

		this.$APIManager.viewFile(this.prettyPath, this.didFinishRequest);
	}

}
</script>

<style scoped>

.options .title {
	font-size: 5vw;
}

</style>
