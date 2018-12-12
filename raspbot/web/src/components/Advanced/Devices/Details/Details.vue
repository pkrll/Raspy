<template>
  <section id="content">
    <div class="row">
      <div>Name:</div><div>{{this.device.name}}</div>
    </div>
    <div class="row">
      <div>Filesystem:</div><div>{{this.device.fstype}}</div>
    </div>
    <div class="row">
      <div>Mountpoint:</div><div style="overflow:scroll">{{this.device.mountpoint}}</div>
    </div>
    <component  v-if="this.device.mountpoint"
                v-bind:is="component"
                v-bind:cancelButtonTitle="umountButtonTitle"
                v-on:cancel="unmountFunction">
   </component>
   <component   v-else
                v-bind:is="component"
                v-bind:confirmButtonTitle="mountButtonTitle"
                v-on:confirm="mountFunction">
   </component>
  </section>
</template>

<script>
import ConfirmPage from '@/components/Common/ConfirmPage/ConfirmPage.vue';

export default {
  name: 'Details',
  props: ['device', 'mountFunction', 'unmountFunction'],
  components: { ConfirmPage },
  data: function() {
    return {
      component: ConfirmPage,
      umountButtonTitle: "Unmount device",
      mountButtonTitle: "Mount device",
    }
  }
}
</script>

<style scoped src="@/shared/general.css"></style>
