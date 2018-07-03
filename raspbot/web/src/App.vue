<template>
  <div id="app" v-if="this.$root.initializing">
    <app-logo></app-logo>
    <app-splash v-bind:textElement="textElement" v-bind:animation="true"></app-splash>
  </div>
  <div id="app" v-else>
    <transition name="slide-down" mode="out-in">
      <app-header v-if="this.$root.loggedIn && !this.$root.fullScreen"></app-header>
    </transition>
    <transition name="route-change" mode="out-in">
      <router-view :key="this.$root._route.params.path"/>
    </transition>
    <transition name="slide-down" mode="out-in">
      <app-footer v-if="this.$root.loggedIn && !this.$root.fullScreen"></app-footer>
    </transition>
  </div>
</template>

<script>
import Header from '@/components/Common/Header/Header.vue';
import Footer from '@/components/Common/Footer/Footer.vue';
import Splash from '@/components/Common/Splash/Splash.vue';
import Logo from '@/components/Common/Logo/Logo.vue';

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-splash': Splash,
    'app-logo': Logo
  },
  data: function() {
    return {
      textElement: 'Initializing'
    }
  }
}
</script>

<style>

.route-change-leave-active,
.route-change-enter-active {
	transition: 0.25s ease-in-out;
  opacity: 1;
}

.route-change-enter {
	transform: translate(-100%, 0);
  opacity: 0;
}

.route-change-leave-to {
  transform: translate(100%, 0);
  opacity: 0;
}

body, html {
  background: rgb(45, 49, 57);
  margin:     0;
  padding:    0;
  height:     100%;
}

a {
	text-decoration: none;
}

body {
          backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

#app {
  background:                 rgb(45, 49, 57);
  color:                      #ffffff;
  display:                    flex;
  flex-direction:             column;
  font-family:                'Avenir', Helvetica, Arial, sans-serif;
  height:                     inherit;
  overflow-y:                 scroll;
  text-align:                 center;
  -webkit-font-smoothing:     antialiased;
  -moz-osx-font-smoothing:    grayscale;
  -webkit-overflow-scrolling: touch;
}

#content {
	font-size: 4vw;
  flex-grow: 1;
}

.options {
	border-bottom: 		1px solid rgba(255,255,255,0.1);
	display: 					flex;
	justify-content: 	space-around;
	font-size:	 			3.5vw;
	padding: 					10px 0;
}

.options > div {
	border-left:  1px solid rgba(255,255,255,0.1);
	cursor:				pointer;
	text-align:   center;
	width:        50%;
}

.options > div:first-child {
	border-left: none;
}

.options .active {
	color: yellow;
}

.options .greyed {
	color: grey;
}

.table-view {
	display:    table;
	font-size:  5vw;
	margin:     auto;
	width:      95%;
}

.table-view .table-row-view {
	display: table-row;
}

.table-row-view .table-cell-view {
	display: table-cell;
}

.row {
	color: 						inherit;
	display: 					flex;
	border-bottom: 		1px solid #fff;
	font-size: 				6vw;
	justify-content: 	space-between;
}

.row div {
	padding: 10px;
}

.row .icon {
	width: 7vw;
}

.row .title {
	flex: 1;
	overflow-x: scroll;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}

.right {
	text-align: right;
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

@media screen and (max-width: 540px) {

	.wrapper {
		font-size: 8vw;
	}

	.options {
		font-size: 7vw;
	}

}
</style>
