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
import Progress from '@/components/Settings/Control/Update/Progress.vue';
import Changelog from '@/components/Settings/Control/Update/Changelog.vue';
import { data, mounted, created, methods } from '@/components/Settings/Control/Update/update.js';

export default {
  name: 'Update',
  components: { Progress, Changelog, Spinner, Content },
  data: data,
  mounted: mounted,
  created: created,
  methods: methods
}
</script>

<style scoped src="@/components/Settings/Control/Update/update.css"></style>
