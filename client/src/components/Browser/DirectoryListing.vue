<template>
	<section class="wrapper">
		<nav class="file-list-view" v-if="files.length > 0 || directories.length > 0">

			<router-link :to="{ name: 'Directory', params: {path: encodeURIComponent(this.parentPath) }}" class="row" v-if="this.prettyPath != '/'">
				<div class="icon"><font-awesome-icon icon="folder-open"/></div>
				<div class="title">...</div>
			</router-link>

			<nav v-for="directory in directories" v-if="showHidden || !directory.name.startsWith('.')">
				<router-link :to="{ name: 'Directory', params: {path: encodeURIComponent(directory.path) }}" class="row">
					<div class="icon"><font-awesome-icon icon="folder-open"/></div>
					<div class="title">{{directory.name}}</div>
					<div class="arrow"><font-awesome-icon icon="angle-right"/></div>
				</router-link>
			</nav>

			<nav v-for="file in files" v-if="showHidden || !file.name.startsWith('.')">
				<router-link :to="{ name: 'File', params: {path: encodeURIComponent(file.path) }}" class="row">
					<div class="icon"><font-awesome-icon v-bind:icon="icon(file.name)"/></div>
					<div class="title">{{file.name}}</div>
					<div class="arrow"><font-awesome-icon icon="angle-right"/></div>
				</router-link>
			</nav>

		</nav>
		<nav class="file-list-view" v-else>
			<router-link :to="{ name: 'Directory', params: {path: encodeURIComponent(this.parentPath) }}" class="row" v-if="this.prettyPath != '/'">
				<div class="icon"><font-awesome-icon icon="folder-open"/></div>
				<div class="title">...</div>
			</router-link>
		</nav>
	</section>
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

<style scoped>

.file-list-view {

}

.item a {
	display: 					block;
	color: 						rgb(255,255,255);
	padding: 					0px 0 0px 20px;
	text-decoration: 	none;
	overflow-x: 			scroll;
}

.file-list-view > * {
	padding: 0px 2vw;
	background: rgb(45, 49, 57);
}

.file-list-view > *:nth-child(even) {
	background: rgb(32,35,44);
}

.wrapper {
	margin: 10px 0;
}

.row {
	border-bottom: none;
}

</style>
