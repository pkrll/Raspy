<template>
  <div id="content">
    <component  v-bind:is="component"
                v-bind:textElement="content"
                v-bind:heading="heading"
                v-bind:logs="logs"
                v-bind:downloadStatus="downloadStatus"
                v-bind:installationStatus="installationStatus"
                v-on:update="update">
   </component>
 </div>
</template>

<script>
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Content from '@/components/Common/Content/Content.vue';
import Progress from '@/components/Control/Update/Progress.vue';
import Changelog from '@/components/Control/Update/Changelog.vue';
import { data, created, methods } from '@/components/Control/Update/update.js';

export default {
  name: 'Update',
  components: { Progress, Changelog, Spinner, Content },
  data: data,
  created: created,
  methods: methods
}
</script>

<style scoped src="@/components/Control/Update/update.css"></style>
