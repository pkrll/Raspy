<template>
  <section id="wrapper">
    <div class="logo" v-bind:class="{ 'logo-on-login': onLogin }" v-on:click="test">
      <div><font-awesome-icon icon="robot"/><br>Raspb<div class="logo-animation">ot</div></div>
    </div>
    <transition name="slide">
      <component v-bind:is="component"
                 v-bind:textElement="textElement"
                 v-bind:animation="animation"
                 v-on:signIn="signIn">
      </component>
    </transition>
  </section>
</template>

<script>
import Splash from '@/components/Common/Splash/Splash.vue';
import Login from '@/components/Login/Login.vue';
import { data, computed, created, mounted, methods } from '@/components/Main/main.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

library.add(faRobot);

export default {
  name: 'Main',
  data: data,
  created: created,
  mounted: mounted,
  methods: methods,
  computed: computed,
  components: { Splash, Login }
}
</script>

<style scoped src="@/components/Main/main.css">
</style>
