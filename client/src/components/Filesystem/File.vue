<template>
	<section class="wrapper">

		<nav class="options">
			<div class="noselect" v-on:click="goBack">
				<font-awesome-icon icon="arrow-circle-left"/>
				<div class="title">Back</div>
			</div>

			<div class="noselect">
				<font-awesome-icon icon="download"/>
				<div class="title">Download</div>
			</div>

			<div class="noselect" v-on:click="didClickDelete = !didClickDelete"
														v-bind:class="{greyed: didClickDelete}">
				<font-awesome-icon icon="trash"/>
				<div class="title">Delete file</div>
			</div>

		</nav>

		<div class="file-viewer-details column-view">
			<div class="file-icon-container">
				<font-awesome-icon icon="file"/>
				<div class="file-name">{{name}}</div>
			</div>

			<div class="table-view">
				<div class="table-row-view">
					<div class="table-cell-view">Size:</div><div class="table-cell-view right">
						{{convertSize(metadata.size)}}
					</div>
				</div>
				<div class="table-row-view">
					<div class="table-cell-view">Created:</div><div class="table-cell-view right">
						{{convertDate(metadata.created)}}
					</div>
				</div>
				<div class="table-row-view">
					<div class="table-cell-view">Last accessed:</div><div class="table-cell-view right">
						{{convertDate(metadata.accessed)}}
					</div>
				</div>
				<div class="table-row-view">
					<div class="table-cell-view">Last modified:</div><div class="table-cell-view right">
						{{convertDate(metadata.modified)}}
					</div>
				</div>
			</div>
		</div>

		<component v-bind:is="bottomComponent"
							 v-bind:cancelCallback="didSelectCancel"
							 v-bind:confirmCallback="didSelectConfirm">
		</component>

	</section>
</template>

<script>
import shared from '@/shared'
import ConfirmButton from '@/components/Common/ConfirmButton'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { arrowcircleleft, download, trash, file } from '@fortawesome/fontawesome-free-solid'

export default {
	props: ['path', 'name'],
	name: "File",
	components: { FontAwesomeIcon, ConfirmButton },
	watch: {
		'didClickDelete' () {
			this.showConfirmation(this.didClickDelete);
		}
	},
	methods: {
		/**
		 * Converts milliseconds to a human readable format.
		 *
		 * @param  {Int} 		timestamp Time in milliseconds
		 * @return {String}						The date in a human readable format.
		 */
		convertDate: function (timestamp) {
			return this.$dateFormatter.unixtimeToString(timestamp*1000, true);
		},
		/**
		 * Invoked by viewFile requests.
		 *
		 * @param  {Object} data The response data.
		 */
		didFinishRequest: function (data) {
			this.metadata = data;
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
			this.$APIManager.deleteFile(this.prettyPath, function (response) {
				if (response.status == 1) {
					this.goBack();
				} else {
					console.log("ERROR" + response);
				}
			}.bind(this));
		}
	},
	data() {
		return {
			didClickDelete: false,
			bottomComponent: '',
			metadata: {}
		}
	},
	created () {
		this.goBack 					= shared.goBack.bind(this);
		this.prettyPath 			= shared.prettyPath(this.path);
		this.convertSize			= shared.bytesToHumanReadable;

		this.$APIManager.viewFile(this.prettyPath, this.didFinishRequest);
	}

}
</script>

<style scoped>

.file-viewer-details {

}

.file-viewer-details .file-icon-container {
	font-size:  8vw;
	text-align: center;
}

.file-viewer-details .file-icon-container .file-name {
	font-size:    4vw;
	line-height:  0;
}

.file-viewer-details .table-view {
	margin-top: 50px;
}

.options .title {
	font-size: 5vw;
}

</style>
