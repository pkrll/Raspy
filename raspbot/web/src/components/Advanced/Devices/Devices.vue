<template>
  <section id="content">
    <component  v-bind:is="component"
                v-bind:devices="devices"
                v-bind:device="device"
                v-bind:showDetails="showDetails"
                v-bind:textElement="errorMessage">
    </component>
  </section>
</template>

<script>
import Content from '@/components/Common/Content/Content.vue';
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Details from '@/components/Advanced/Devices/Details/Details.vue';
import List from '@/components/Advanced/Devices/List/List.vue';
import { data, methods, created } from '@/components/Advanced/Devices/devices.js';

export default {
  name: 'Devices',
  components: { Content, Spinner, List, Details },
  data: data,
  methods: methods,
  created: created
}
</script>

<style scoped src="@/shared/general.css"></style>
