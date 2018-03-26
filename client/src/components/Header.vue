<template>

	<header>
		<div class="header">Raspy v0.0.1 running on Linux 4.1.19-v7+</div>
		<nav class="menu">
				<router-link v-bind:to="this.browsePath()" v-bind:class="{ active: this.$route.meta.tab == 1}">
					<font-awesome-icon icon="hdd"/>
					<div>Browse files</div>
				</router-link>

				<router-link to="/system" v-bind:class="{ active: this.$route.meta.tab == 2}">
					<font-awesome-icon icon="server"/>
					<div>System</div>
				</router-link>

				<router-link to="/sensors" v-bind:class="{ active: this.$route.meta.tab == 3}">
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
	background: rgb(82, 172, 120);
	font-size: 	3vw;
	padding: 		10px 10px 0 10px;
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

</style>
