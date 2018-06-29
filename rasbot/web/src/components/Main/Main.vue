<template>
  <section id="wrapper">
    <logo v-bind:onLogin="onLogin" v-bind:animation="animation"></logo>
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
import Logo from '@/components/Common/Logo/Logo.vue';
import Login from '@/components/Login/Login.vue';
import { data, computed, created, mounted, methods, watch } from '@/components/Main/main.js';

export default {
  name: 'Main',
  data: data,
  watch: watch,
  created: created,
  mounted: mounted,
  methods: methods,
  computed: computed,
  components: { Splash, Login, 'logo': Logo }
}
</script>

<style scoped src="@/components/Main/main.css"></style>
