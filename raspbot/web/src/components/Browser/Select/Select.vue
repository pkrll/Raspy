<template>
  <section id="content">
    <nav class="options" v-show="this.errorMessage == undefined">
      <div class="noselect" v-on:click="didClickCancel">
        <font-awesome-icon icon="ban"/>
        <div class="title">Cancel</div>
      </div>

      <div class="noselect" v-on:click="didClickSelect">
        <font-awesome-icon icon="check"/>
        <div class="title">Select</div>
      </div>

      <div class="noselect" v-on:click="makeDirectory">
        <font-awesome-icon icon="folder"/>
        <div class="title">New folder</div>
      </div>
    </div>
  </nav>

  <component  v-bind:is="middleComponent"
              v-bind:directories="directories"
              v-bind:files="files"
              v-bind:prettyPath="prettyPath"
              v-bind:textElement="errorMessage">
  </component>

</section>

</template>

<script>
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Content from '@/components/Common/Content/Content.vue';
import Directory from '@/components/Browser/Directory/Directory.vue';
import { data, computed, methods, created } from '@/components/Browser/Select/select.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBan, faCheck, faFolder, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faFileImage, faFilePdf, faFileArchive, faFileAlt, faFileWord, faFilePowerpoint, faFileExcel, faFileAudio, faFileVideo, faFileCode } from '@fortawesome/free-solid-svg-icons';

library.add(faBan, faCheck, faFolder, faTrash, faFileImage, faFilePdf, faFileArchive, faFileAlt, faFileWord, faFilePowerpoint, faFileExcel, faFileAudio, faFileVideo, faFileCode);

export default {
  props: { path: { default: '/' } },
  name: 'Select',
  data: data,
  components: { Directory, Spinner, Content, ConfirmButton },
  computed: computed,
  methods: methods,
  created: created,
  beforeRouteLeave (to, from, next) {
    if (to.name == 'Select' || to.name == 'Select: Directory') {
      next();
    } else {
      next({ name: 'Select: Directory', params: to.params });
    }
  }
}
</script>

<style scoped>

.options .title {
	font-size: 3.5vw;
}

</style>
