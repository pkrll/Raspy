<template>
  <div id="content">
    <component  v-bind:is="component"
                v-bind:textElement="textElement"
                v-bind:confirmButtonTitle="confirmButtonTitle"
                v-bind:cancelButtonTitle="cancelButtonTitle"
                v-on:confirm="shutdown"
                v-on:cancel="cancel">
   </component>
 </div>
</template>

<script>
import { data, methods } from '@/components/Control/Shutdown/shutdown.js';
import ConfirmPage from '@/components/Common/ConfirmPage/ConfirmPage.vue';
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Content from '@/components/Common/Content/Content.vue';

export default {
  name: 'Shutdown',
  components: { ConfirmPage, Spinner, Content },
  data: data,
  methods: methods
}
</script>

<style scoped src="@/shared/general.css"></style>
