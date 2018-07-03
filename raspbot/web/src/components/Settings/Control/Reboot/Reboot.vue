<template>
  <div id="content">
    <div id="confirmation" v-if="!didConfirm">
      <div>Are you sure you want to reboot?</div>
      <div id="buttons">
        <div v-on:click="reboot" class="button">Reboot</div>
        <div v-on:click="cancel" class="button red">Cancel</div>
      </div>
    </div>
    <component  v-bind:is="component"
                v-bind:textElement="textElement" v-else>
   </component>
 </div>
</template>

<script>
import { data, methods } from '@/components/Settings/Control/Reboot/reboot.js';
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Content from '@/components/Common/Content/Content.vue';

export default {
  name: 'Reboot',
  components: { Spinner, Content },
  data: data,
  methods: methods
}
</script>

<style scoped src="@/components/Settings/main.css"></style>
<style scoped src="@/components/Settings/Control/Reboot/reboot.css"></style>
