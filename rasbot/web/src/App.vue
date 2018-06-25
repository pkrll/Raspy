<template>
  <div id="app">
    <transition name="slide-down" mode="out-in">
      <app-header v-if="this.$root.isLoggedIn && !this.$root.fullScreen"></app-header>
    </transition>
    <transition name="route-change" mode="out-in">
      <router-view/>
    </transition>
    <transition name="slide-down" mode="out-in">
      <app-footer v-if="this.$root.isLoggedIn && !this.$root.fullScreen"></app-footer>
    </transition>
  </div>
</template>

<script>
import Header from '@/components/Common/Header/Header.vue';
import Footer from '@/components/Common/Footer/Footer.vue';

export default {
  name: 'App',
  components: { 'app-header': Header, 'app-footer': Footer }
}
</script>

<style>

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
  background:               rgb(45, 49, 57);
  color:                    #ffffff;
  font-family:              'Avenir', Helvetica, Arial, sans-serif;
  height:                   inherit;
  text-align:               center;
  -webkit-font-smoothing:   antialiased;
  -moz-osx-font-smoothing:  grayscale;
  display: flex;
  flex-direction: column;
}

.wrapper {
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

@media screen and (max-width: 540px) {

	.wrapper {
		font-size: 8vw;
	}

	.options {
		font-size: 7vw;
	}

}
</style>
