<template>

	<header>
		<div class="header">
			<img src="../../assets/img/logo.svg" style="height:5vw;"> Raspy 0.1.0
		</div>
		<nav class="menu">
				<router-link v-bind:to="this.browsePath()" v-bind:class="{ active: this.$route.meta.tab == 1, greyed: !this.$root.isLoggedIn }">
					<font-awesome-icon icon="hdd"/>
					<div>Browse files</div>
				</router-link>

				<router-link to="/system" v-bind:class="{ active: this.$route.meta.tab == 2, greyed: !this.$root.isLoggedIn }">
					<font-awesome-icon icon="server"/>
					<div>System</div>
				</router-link>

				<router-link to="/sensors" v-bind:class="{ active: this.$route.meta.tab == 3, greyed: !this.$root.isLoggedIn }">
					<font-awesome-icon icon="server"/>
					<div>Sensors</div>
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
			let favorite = this.$bookmarker.get();
			if (favorite != undefined) {
				return { name: 'Browse path', params: {path: favorite }};
			}

			return { name: 'Browse' };
		}
	}
}
</script>

<style scoped>

.header {
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

.menu > a.greyed {
	color: rgb(210, 210, 210);
}

@media screen and (max-width: 540px) {

	.menu > a {
		font-size: 6vw;
	}

}

</style>
