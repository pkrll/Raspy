<template>
  <div id="confirmation">
    <div>{{textElement}}</div>
    <div id="buttons">
      <div v-on:click="$emit('confirm')" class="button" v-show="confirmButtonTitle != undefined">{{confirmButtonTitle}}</div>
      <div v-on:click="$emit('cancel')" class="button red" v-show="cancelButtonTitle != undefined">{{cancelButtonTitle}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Reboot',
  props: ['textElement', 'confirmButtonTitle', 'cancelButtonTitle']
}
</script>

<style scoped src="@/components/Common/ConfirmPage/confirmPage.css"></style>
