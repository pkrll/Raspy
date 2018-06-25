<template>
	<section id="content">
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
import { computed, methods, created } from '@/components/Browser/Directory/directory.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolderOpen, faFile, faAngleRight } from '@fortawesome/free-solid-svg-icons';

library.add(faFolderOpen, faFile, faFolderOpen, faAngleRight);

export default {
	props: ['directories', 'files', 'showHidden', 'prettyPath'],
	name: "Directory",
	computed: computed,
	methods: methods,
  created: created
}
</script>

<style scoped src="@/components/Browser/Directory/directory.css">
</style>
