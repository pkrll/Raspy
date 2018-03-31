<template>
	<div class="file-viewer-details column-view">
		<div class="file-icon-container">
			<font-awesome-icon v-bind:icon="icon" class="icon"/>
			<div class="file-name">{{file.filename}}</div>
		</div>

		<div class="table-view">
			<div class="table-row-view">
				<div class="table-cell-view">Size:</div><div class="table-cell-view right">
					{{convertSize(file.metadata.size)}}
				</div>
			</div>
			<div class="table-row-view">
				<div class="table-cell-view">Created:</div><div class="table-cell-view right">
					{{convertDate(file.metadata.created)}}
				</div>
			</div>
			<div class="table-row-view">
				<div class="table-cell-view">Last accessed:</div><div class="table-cell-view right">
					{{convertDate(file.metadata.accessed)}}
				</div>
			</div>
			<div class="table-row-view">
				<div class="table-cell-view">Last modified:</div><div class="table-cell-view right">
					{{convertDate(file.metadata.modified)}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import shared from '@/shared'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
	props: ['file'],
	name: 'FileDetails',
	components: { FontAwesomeIcon },
	computed: {
		icon: function () {
			return shared.iconForFile(this.file.filename);
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

		convertSize: function (bytes) {
			return shared.bytesToHumanReadable(bytes);
		}
	}
}
</script>

<style scoped>

.file-viewer-details {

}

.file-viewer-details .file-icon-container {
	font-size:  	8vw;
	text-align: 	center;
	padding-top: 	20px;
}

.file-viewer-details .file-icon-container .icon {
	font-size: 10vw;
}

.file-viewer-details .file-icon-container .file-name {
	font-size: 4vw;
	word-wrap: break-word;
}

.file-viewer-details .table-view {
	margin-top: 25px;
}

</style>
