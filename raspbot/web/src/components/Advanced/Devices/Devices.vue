<template>
  <section id="content">
    <component  v-bind:is="component"
                v-bind:devices="devices"
                v-bind:device="device"
                v-bind:showDetails="showDetails">
    </component>
  </section>
</template>

<script>
import Details from '@/Components/Advanced/Devices/Details/Details.vue';
import List from '@/Components/Advanced/Devices/List/List.vue';
import { data, methods } from '@/components/Advanced/Devices/devices.js';

export default {
  name: 'Devices',
  components: { List, Details },
  data: data,
  methods: methods
}
</script>

<style scoped src="@/shared/general.css"></style>
