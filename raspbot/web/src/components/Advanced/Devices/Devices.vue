<template>
  <section id="content-no-margin">
    <component  v-bind:is="component"
                v-bind:devices="devices"
                v-bind:device="device"
                v-bind:showDetails="showDetails"
                v-bind:textElement="errorMessage"
                v-bind:unmountFunction="unmount"
                v-bind:mountFunction="mount"
                v-bind:didClickCancel="didClickCancel"
                v-bind:didClickSelect="didClickSelect">
    </component>
  </section>
</template>

<script>
import Select from '@/components/Browser/Select/Select.vue';
import Content from '@/components/Common/Content/Content.vue';
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Details from '@/components/Advanced/Devices/Details/Details.vue';
import List from '@/components/Advanced/Devices/List/List.vue';
import { data, methods, created } from '@/components/Advanced/Devices/devices.js';

export default {
  name: 'Devices',
  components: { Select, Content, Spinner, List, Details },
  data: data,
  methods: methods,
  created: created
}
</script>

<style scoped>
#content-no-margin {
  margin: 0;
}
</style>
<style scoped src="@/shared/general.css"></style>
