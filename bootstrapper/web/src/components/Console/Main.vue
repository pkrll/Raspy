<template>
	<section>
		<transition name="slide-menu">
			<component 	v-bind:is="overlayComponent"
									v-on:showConsole="showConsole"></component>
		</transition>
    <div id="console">
  		<div id="output">
  			<pre>Running: Raspy Bootstrapper 1.0.0</pre>
  			<pre v-for="log in logs">{{log}}</pre>
  			<pre id="cursor">$ _</pre>
  		</div>
  		<div id="consoleBottomPanel">
  			<div v-on:click="showConsole(false)">
  				<span><font-awesome-icon icon="caret-square-up"/><br/>Show menu</span>
  			</div>
  			<div v-on:click="clearConsole">
  				<span><font-awesome-icon icon="minus-square"/><br/>Clear console</span>
  			</div>
  		</div>
  	</div>
	</section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinusSquare, faCaretSquareUp } from '@fortawesome/free-solid-svg-icons'
import { methods } from '@/components/Console/Main.js'
import Menu from '@/components/Menu'

library.add(faMinusSquare, faCaretSquareUp);

export default {
  name: 'Console',
  components: { Menu },
  data: function() {
    return {
      overlayComponent: 'Menu',
      menuHidden: true,
      logs: []
    }
  },
  methods: methods
}
</script>

<style scoped>

.slide-menu-leave-active,
.slide-menu-enter-active {
	transition: 0.5s;
}

.slide-console-enter-active {
	transition: 0s;
}

.slide-console-leave-active {
	transition: 0s;
}

.slide-menu-enter {
	transform: translate(0%, 100%);
}

.slide-menu-leave-to {
	transform: translate(0%, 100%);
}

.slide-console-enter {
	transform: translate(0%, 0%);
}

.slide-console-leave-to {
	transform: translate(0%, 0%);
}

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
  padding: 0;
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
  position: absolute;
  padding-top: 10px;
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

@media only screen and (min-width: 320px)
									 and (max-width: 736px)
									 and (orientation: portrait) {

	#console {
		font-size: 6vw;
	}

	#consoleBottomPanel div {
		font-size: 4vw;
	}

	#consoleBottomPanel div i {
		font-size: 5vw;
	}

}

@media only screen and (min-device-width: 736px)
									 and (max-device-width: 1024px)
									 and (orientation: portrait) {

	#console {
		font-size: 6vw;
	}

	#consoleBottomPanel div {
		font-size: 4vw;
	}

	#consoleBottomPanel div i {
		font-size: 5vw;
	}

}

</style>
