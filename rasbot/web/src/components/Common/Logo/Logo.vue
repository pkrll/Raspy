<template>
  <div class="logo" v-bind:class="{ 'logo-on-login': onLogin }">
    <div><font-awesome-icon icon="robot"/><br>Raspb<div class="ot" v-bind:class="{'logo-animation': animation }">ot</div></div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

library.add(faRobot);

export default {
  name: 'Logo',
  props: ['onLogin', 'animation']
}
</script>

<style scoped src="@/components/Common/Logo/logo.css"></style>
