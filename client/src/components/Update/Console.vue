<template>
	<div id="console">
		<div id="output">
			<pre>Running: Raspy Updater version 0.0.1...</pre>
			<pre v-for="log in logs">{{log}}</pre>
			<pre id="cursor">$ <span class="blinking-cursor">_</span></pre>
		</div>
		<div id="consoleBottomPanel">
			<div v-on:click="clearConsole">
				<span><font-awesome-icon icon="caret-square-up"/><br/>Show menu</span>
			</div>
			<div onclick="clearConsole()">
				<span><font-awesome-icon icon="minus-square"/><br/>Clear console</span>
			</div>
		</div>
	</div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { minussquare, caretsquareup } from '@fortawesome/fontawesome-free-solid'

export default {
	name: 'UpdateConsole',
	props: ['logs'],
	components: { FontAwesomeIcon },
	watch: {
		logs: function (newValue, oldValue) {
			let output = this.$el.querySelector("#output");
			output.scrollTop = output.scrollHeight;
		}
	},
	methods: {
		clearConsole: function() {
			this.$emit('toggleConsole', false);
		}
	}
}
</script>

<style scoped>

.slide-enter {
  transform: translate(0%, -100%);
}

.slide-leave-to {
  transform: translate(0%, -100%);
}

#console {
  background: #000;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: #fff;
  font-size: 2vw;
  padding: 30px 20px  20px 20px;
  height: 100%;
}

#output {
	padding-bottom: 50px;
  overflow: auto;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

#output pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

#consoleBottomPanel {
  height: auto;
  padding-top: 10px;
  position: fixed;
  bottom: 0;
  background: #2c3e50;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: space-between;
}

#consoleBottomPanel div {
  cursor: pointer;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  font-size: 2vw;
}

#consoleBottomPanel div i {
  font-size: 3vw;
}

</style>
