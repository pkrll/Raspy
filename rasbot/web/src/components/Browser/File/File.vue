<template>
  <section id="content">
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
							 v-bind:textElement="textElement">
		</component>

		<component v-bind:is="bottomComponent"
               v-on:confirm="deleteFile">
		</component>
	</section>
</template>

<script>
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Content from '@/components/Common/Content/Content.vue';
import Details from '@/components/Browser/File/Details.vue';
import ConfirmButton from '@/components/Common/ConfirmButton/ConfirmButton.vue';
import { data, computed, watch, methods, created } from '@/components/Browser/File/file.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload, faTrash, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faDownload, faTrash, faArrowCircleLeft);

export default {
  name: 'File',
  props: ['path'],
  components: { Details, Content, Spinner, ConfirmButton },
  data: data,
  computed: computed,
  watch: watch,
  methods: methods,
  created: created
}
</script>

<style scoped>

.options {
  font-size: 7vw;
}

.options .title {
  font-size: 4vw;
}

</style>
