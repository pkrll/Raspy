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
import { computed, methods } from '@/components/Browser/File/details.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileImage, faFilePdf, faFileArchive, faFileAlt, faFileWord, faFilePowerpoint, faFileExcel, faFileAudio, faFileVideo, faFileCode } from '@fortawesome/free-solid-svg-icons';

library.add(faFileImage, faFilePdf, faFileArchive, faFileAlt, faFileWord, faFilePowerpoint, faFileExcel, faFileAudio, faFileVideo, faFileCode);

export default {
	name: 'FileDetails',
	props: ['file'],
	computed: computed,
	methods: methods
}
</script>

<style scoped>

.file-viewer-details {
  text-align: left;
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
