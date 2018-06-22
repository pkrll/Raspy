<template lang="html">
  <div id="console">
    <div id="consoleBottomPanel">
      <div v-on:click="$emit('showConsole', false)">
        <span><font-awesome-icon icon="caret-square-down"/><br/>Show menu</span>
      </div>
      <div v-on:click="$emit('clearConsole')">
        <span><font-awesome-icon icon="minus-square"/><br/>Clear console</span>
      </div>
    </div>
    <div id="output">
      <pre>Raspbot 1.0.0: <span v-bind:class="status">{{status}}</span></pre>
      <pre v-for="log in logs">{{log}}</pre>
      <pre id="cursor" v-if="!commandInprogress">$ <span class="animation">_</span></pre>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinusSquare, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'

library.add(faMinusSquare, faCaretSquareDown);

export default {
  name: 'Console',
  props: ['logs', 'commandInprogress'],
  computed: {
    status: function () {
      return (this.$root.serverStatus) ? 'running' : 'stopped';
    }
  }
}
</script>

<style scoped src="@/components/Console/Console.css">

</style>
