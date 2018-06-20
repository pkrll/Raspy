<template>
	<div id="console">
		<div id="output">
			<pre>Running: Raspy 0.1.1</pre>
			<pre v-for="log in logs">{{log}}</pre>
			<pre id="cursor">$ _</pre>
		</div>
		<div id="consoleBottomPanel">
			<div v-on:click="showConsole">
				<span><font-awesome-icon icon="caret-square-up"/><br/>Show menu</span>
			</div>
			<div v-on:click="clearConsole">
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
	methods: {
		clearConsole: function() {
			this.$emit('clearConsole');
		},
		showConsole: function() {
			this.$emit('showConsole', false);
		}
	}
}
</script>

<style scoped>

* {
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
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
	overflow: hidden;
}

#output {
	padding-bottom: 55px;
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
