<template lang="html">
  <div id="console">
    <div id="panel">
      <div v-on:click="$emit('showConsole', false)">
        <span><font-awesome-icon icon="caret-square-down"/><br/>Show menu</span>
      </div>
      <div v-on:click="$emit('clearConsole')">
        <span><font-awesome-icon icon="minus-square"/><br/>Clear console</span>
      </div>
    </div>
    <div id="output">
      <pre v-for="log in logs">{{log}}</pre>
      <pre id="cursor" v-if="!commandInprogress">$ <span class="animation">_</span></pre>
    </div>
    <div id="footer">
      <div>{{this.$Application.appName}} {{this.$Application.version}}: <span v-bind:class="status">{{status}}</span></div>
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
  watch: {
    /**
     * Watches changes to logs, and scrolls down to the bottom
     * of the console on change.
     *
     * @param  Array  newValue  The new value
     * @param  Array  oldValue  The old value
     */
    logs: function (newValue, oldValue) {
      this.$nextTick(function () {
        this.$el.scrollTop = this.$el.scrollHeight;
      });
    },
    /**
     * Watches changes to commandInprogress, and scrolls down
     * to the bottom of the console on change.
     *
     * @param  Boolean  newValue  The new value
     * @param  Boolean  oldValue  The old value
     */
    commandInprogress: function (newValue, oldValue) {
      if (newValue == false) {
        this.$nextTick(function () {
          this.$el.scrollTop = this.$el.scrollHeight;
        });
      }
    }
  },
  computed: {
    status: function () {
      return (this.$root.serverStatus) ? 'running' : 'stopped';
    }
  }
}
</script>

<style scoped src="@/components/Console/Console.css">
</style>
