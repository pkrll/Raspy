<template>
  <div class="splashMessage" v-bind:class="{animation: doAnimate}">{{textElement}}</div>
</template>

<script>

export default {
  name: 'Splash',
  props: ['textElement', 'animation'],
  computed: {
    doAnimate: function() {
      return this.animation;
    }
  }
}
</script>

<style scoped>

.splashMessage {
  height: auto;
  flex-grow: 1;
  font-size: 5vw;
}

.animation {
   -webkit-animation: flicker 2s ease-in-out infinite;
      -moz-animation: flicker 2s ease-in-out infinite;
        -o-animation: flicker 2s ease-in-out infinite;
           animation: flicker 2s ease-in-out infinite;
}

@media only screen and (min-width: 1024px) {

 .animation {
   font-size: 3vw;
 }

}


</style>
