<template>
	<section id="content">
		<nav class="file-list-view" v-if="directories.length > 0">

			<router-link :to="{ name: 'Select', params: {path: encodeURIComponent(this.parentPath) }}" class="row" v-if="this.prettyPath != '/'">
				<div class="icon"><font-awesome-icon icon="folder-open"/></div>
				<div class="title">..</div>
			</router-link>

			<nav v-for="directory in directories" v-if=" !directory.name.startsWith('.')">
				<div v-on:click="browse(directory.path)" class="row">
					<div class="icon"><font-awesome-icon icon="folder-open"/></div>
					<div class="title">{{directory.name}}</div>
					<div class="arrow"><font-awesome-icon icon="angle-right"/></div>
				</div>
			</nav>
    </nav>
    <nav class="file-list-view" v-else>
      <div v-on:click="browse(encodeURIComponent(this.parentPath))" class="row" v-if="this.prettyPath != '/'">
        <div class="icon"><font-awesome-icon icon="folder-open"/></div>
        <div class="title">..</div>
      </div>
    </nav>
	</section>
</template>

<script>
import { computed, methods, created } from '@/components/Browser/Directory/directory.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolderOpen, faFile, faAngleRight } from '@fortawesome/free-solid-svg-icons';

library.add(faFolderOpen, faFile, faFolderOpen, faAngleRight);

export default {
	name: "Directory",
  props: ['browse', 'directories', 'prettyPath', 'currentPath'],
	computed: computed,
	methods: {

  },
  created: created
}
</script>

<style scoped src="@/components/Browser/Directory/directory.css">
</style>
