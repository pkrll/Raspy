<template>
  <div id="wrapper">
    <div class="title" v-on:click="go" v-bind:class="{ 'title-fade': onSplash }"><font-awesome-icon icon="robot"/><br>Raspbot</div>
    <transition name="slide-up">
        <component v-bind:is="component"></component>
    </transition>
  </div>
</template>

<script>
import { methods, created } from '@/components/Main/Main.js'
import Splash from '@/components/Main/Splash'
import Login from '@/components/Login/Main'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRobot } from '@fortawesome/free-solid-svg-icons'

library.add(faRobot);

export default {
  name: 'Main',
  components: { Login, Splash },
  methods: methods,
  created: created,
  data: function () {
    return {
      component: Splash
    }
  },
  computed: {
    onSplash: function () {
      return (this.component == 'Login')
    }
  }
}
</script>

<style scoped>
.title {
  top: 20%;
  position: absolute;
  font-size: 8vw;
}

.slide-up-leave-active,
.slide-up-enter-active {
	transition: 1s ease-in-out;
  opacity: 1;
}

.slide-up-enter {
	transform: translate(0, 100%);
  opacity: 0;
}

.slide-up-leave-to {
	opacity: 0;
}

#wrapper {
  width:            100%;
  background:       rgb(45, 49, 57);
  display:          flex;
  height:           100%;
  flex-direction:   column;
  align-items:      center;
  justify-content:  center;
}

@media only screen and (min-device-width: 320px)
									 and (max-device-width: 424px)
									 and (orientation: portrait) {

   .title { font-size: 10vw; }

}

@media only screen and (min-device-width: 520px)
									 and (max-device-width: 1023px)
									 and (orientation: portrait) {

   .title { font-size: 10vw; }

   .title-fade {
     transition: 1s;
     top: 10%;
   }

}

@media only screen and (min-device-width: 1024px)
                   and (max-device-width: 2048px)
									 and (orientation: portrait) {

   .title { font-size: 10vw; }

   .title-fade {
     transition: 1s;
     top: 10%;
   }

}

@media only screen and (min-device-width: 320px)
									 and (max-device-width: 812px)
									 and (orientation: landscape) {

   .title {
     position: inherit;
     font-size: 10vw;
   }

   .title-fade {
     transition: 1s;
     opacity: 0;
   }

}

@media only screen and (min-device-width: 813px)
									 and (max-device-width: 1365px)
									 and (orientation: landscape) {

   .title {
     position: inherit;
     font-size: 10vw;
   }

   .title-fade {
     position: absolute;
     font-size: 3.5vw;
     transition: 1s;
     top: 5%;
   }

}

@media only screen and (min-device-width: 1366px)
									 and (max-device-width: 2560px)
                   and (min-device-height: 600px)
									 and (orientation: landscape) {

   .title {
     position: inherit;
     font-size: 10vw;
   }

   .title-fade {
     position: absolute;
     font-size: 5vw;
     transition: 1s;
     top: 10%;
   }

}

</style>
