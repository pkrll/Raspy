<template>
	<header>
		<nav class="menu">
				<router-link v-bind:to="this.browsePath()" v-bind:class="{ active: this.$route.meta.tab == 1 }">
					<font-awesome-icon icon="hdd"/>
					<div>Browse files</div>
				</router-link>

				<router-link to="/dashboard" v-bind:class="{ active: this.$route.meta.tab == 2 }">
					<font-awesome-icon icon="tachometer-alt"/>
					<div>Dashboard</div>
				</router-link>

				<router-link to="/settings" v-bind:class="{ active: this.$route.meta.tab == 3 }">
					<font-awesome-icon icon="sliders-h"/>
					<div>Settings</div>
				</router-link>
		</nav>
	</header>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { hdd, server } from '@fortawesome/fontawesome-free-solid'

export default {
	name: 'Header',
	components: { FontAwesomeIcon },
	methods: {
		browsePath: function () {
			let favorite = this.$CookieManager.getBookmark();
			if (favorite != undefined) {
				return { name: 'Directory', params: {path: favorite }};
			}

			return { name: 'Browser' };
		}
	}
}
</script>

<style scoped>

.header {
	font-family: 'Avenir';
	font-size: 	5vw;
	padding: 		5px 10px 5px 10px;
	text-align: right;
}

.menu {
	background: 			rgb(82, 172, 120);
	display: 					flex;
	flex-direction: 	row;
	align-items: 			center;
	justify-content: 	space-around;
	padding: 					10px;
}

.menu > a {
	color:						rgb(255,255,255);
	font-size: 				4vw;
	text-align: 			center;
	text-decoration: 	none;
}

.menu > a.active {
	color: yellow;
}

.menu > a.greyed {
	color: rgb(210, 210, 210);
}

@media screen and (max-width: 540px) {

	.menu > a {
		font-size: 6vw;
	}

}

</style>
