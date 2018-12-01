<template>
	<header id="header">
		<nav class="menu">
				<router-link v-bind:to="this.browsePath()" v-bind:class="{ active: this.$route.meta.tab == 1 }">
					<font-awesome-icon icon="hdd"/>
					<div>Files</div>
				</router-link>

				<router-link to="/dashboard" v-bind:class="{ active: this.$route.meta.tab == 2 }">
					<font-awesome-icon icon="tachometer-alt"/>
					<div>Dashboard</div>
				</router-link>

				<router-link to="/menu" v-bind:class="{ active: this.$route.meta.tab == 3 }">
					<font-awesome-icon icon="align-justify"/>
					<div>Menu</div>
				</router-link>
		</nav>
	</header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHdd, faTachometerAlt, faSlidersH, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

library.add(faHdd, faTachometerAlt, faSlidersH, faAlignJustify);

export default {
	name: 'Header',
	methods: {
		browsePath: function () {
			let favorite = this.$root.getBookmark();
			if (favorite != undefined) {
				return { name: 'Directory', params: {path: favorite }};
			}

			return { name: 'Browser' };
		}
	}
}
</script>

<style scoped src="@/components/Common/Header/header.css">
</style>
