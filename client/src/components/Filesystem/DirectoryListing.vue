<template>
	<nav class="file-list-view" v-if="files.length > 0 || directories.length > 0">
		<div class="item" v-if="this.prettyPath != '/'">
			<router-link :to="{ name: 'Browse path', params: {path: encodeURIComponent(this.parentPath) }}">
				<span><font-awesome-icon icon="folder-open"/>&nbsp;&nbsp;...</span>
			</router-link>
		</div>

		<div class="item" v-for="directory in directories" v-if="showHidden || !directory.name.startsWith('.')">
			<router-link :to="{ name: 'Browse path', params: {path: encodeURIComponent(directory.path) }}">
				<span><font-awesome-icon icon="folder-open"/>&nbsp;&nbsp;{{directory.name}}</span>
			</router-link>
		</div>

		<div class="item" v-for="file in files" v-if="showHidden || !file.name.startsWith('.')">
			<router-link :to="{ name: 'File', params: {path: encodeURIComponent(file.path) }}">
				<span><font-awesome-icon v-bind:icon="icon(file.name)"/>&nbsp;&nbsp;{{file.name}}</span>
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
</template>

<script>
import shared from '@/shared'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { folderopen, file } from '@fortawesome/fontawesome-free-solid'

export default {
	props: ['directories', 'files', 'showHidden', 'prettyPath'],
	name: "DirectoryListing",
	components: { FontAwesomeIcon },
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
		}
	},
	methods: {
		icon: function (filename) {
			return this.iconForFile(filename);
		}
	},
	created() {
		this.startsWith 	= shared.startsWith;
		this.iconForFile 	= shared.iconForFile;
	}
}
</script>

<style>

.file-list-view {

}

.item a {
	display: 					block;
	color: 						rgb(255,255,255);
	padding: 					0px 0 0px 20px;
	text-decoration: 	none;
	overflow-x: 			scroll;
}

.item {
	background: rgb(45, 49, 57);
}

.item:nth-child(even) {
	background: rgb(32,35,44);
}

</style>
