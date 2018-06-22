<template>
  <div id="wrapper">
    <div class="title" v-bind:class="{ 'title-login': onLogin, 'title-empty': onEmpty }">
      <font-awesome-icon icon="robot"/><br>Raspbot
    </div>
    <transition name="slide-up">
        <component  v-bind:is="component"
                    v-bind:message="message"
                    v-on:handleAuthResponse="handleAuthResponse"></component>
    </transition>
  </div>
</template>

<script>
import { data, computed, methods, mounted } from '@/components/Main/Main.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import Splash from '@/components/Main/Splash.vue'
import Login from '@/components/Login/Main.vue'

library.add(faRobot);

export default {
  name: 'Main',
  components: { Login, Splash },
  data: data,
  computed: computed,
  methods: methods,
  mounted: mounted
}
</script>

<style scoped src="@/components/Main/Main.css">
</style>
