<template>
  <div id="content">
    <component  v-bind:is="middleComponent"
                v-bind:textElement="content"
                v-bind:heading="heading">
   </component>
 </div>
</template>

<script>
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Content from '@/components/Common/Content/Content.vue';
import Changelog from '@/components/Settings/General/Update/Changelog.vue';
import { data, created, methods } from '@/components/Settings/General/Update/main.js';

export default {
  name: 'Update',
  components: { Changelog, Spinner, Content },
  data: data,
  created: created,
  methods: methods
}
</script>

<style scoped>
</style>
