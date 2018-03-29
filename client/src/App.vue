<template>
  <div id="app">
		<app-header v-if="this.$root.isLoggedIn"></app-header>
    <router-view class="container"/>
		<app-footer></app-footer>
  </div>
</template>

<script>
import Header from '@/components/Common/Header.vue'
import Footer from '@/components/Common/Footer.vue'

export default {
  name: 'App',
	components: { 'app-header': Header, 'app-footer': Footer },
	created: function () {
		if (this.$root.isLoggedIn == false) {
			this.$root._router.push('/');
		}
	}
}
</script>

<style>

html, body {
	min-height: 100vh;
}

body {
	background: 	rgb(45, 49, 57);
	color: 				#fff;
	margin: 			0;
	font-family: 	"Hind";
}

a {
	text-decoration: none;
}

#app {
	color:										rgb(255,255,255);
	display: 									flex;
  font-family:							'Hind', 'Avenir', Helvetica, Arial, sans-serif;
	flex-direction: 					column;
	min-height: 							100vh;
   -webkit-font-smoothing:	antialiased;
  -moz-osx-font-smoothing:	grayscale;
}

#app > .container {
	flex: 1 0;
}

.wrapper {
	font-size: 4vw;
}

.options {
	border-bottom: 		1px solid #fff;
	display: 					flex;
	justify-content: 	space-around;
	font-size:	 			3.5vw;
	padding: 					10px 0;
}

.options > div {
	border-left:  1px solid #fff;
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
