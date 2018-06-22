<template>
  <div>
    <div class="animation">Initializing...</div>
  </div>
</template>

<script>

export default {
  name: 'Splash'
}
</script>

<style scoped>

.animation {
  font-size: 6vw;
   -webkit-animation: flicker 2s ease-in-out infinite;
      -moz-animation: flicker 2s ease-in-out infinite;
        -o-animation: flicker 2s ease-in-out infinite;
           animation: flicker 2s ease-in-out infinite;
}

@keyframes flicker {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-o-keyframes flicker {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-moz-keyframes flicker {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-webkit-keyframes flicker {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}

@media only screen and (min-width: 1024px) {

 .animation {
   font-size: 3vw;
 }

}


</style>
