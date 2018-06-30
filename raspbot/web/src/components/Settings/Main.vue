<template>
  <section id="content">
		<div class="heading">Settings</div>
		<router-link to="/settings/browser" class="row">
			<div class="icon"><font-awesome-icon icon="hdd"/></div>
			<div class="title">File browser</div>
			<div class="arrow"><font-awesome-icon icon="angle-right"/></div>
		</router-link>
		<router-link to="/settings/dashboard" class="row">
			<div class="icon"><font-awesome-icon icon="tachometer-alt"/></div>
			<div class="title">Dashboard</div>
			<div class="arrow"><font-awesome-icon icon="angle-right"/></div>
		</router-link>
		<router-link to="/settings/account" class="row">
			<div class="icon"><font-awesome-icon icon="user-circle"/></div>
			<div class="title">Account</div>
			<div class="arrow"><font-awesome-icon icon="angle-right"/></div>
		</router-link>
		<router-link to="/settings/general" class="row">
			<div class="icon"><font-awesome-icon icon="wrench"/></div>
			<div class="title">General</div>
			<div class="arrow"><font-awesome-icon icon="angle-right"/></div>
		</router-link>
	</section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHdd, faAngleRight, faTachometerAlt, faUserCircle, faWrench } from '@fortawesome/free-solid-svg-icons';

library.add(faHdd, faAngleRight, faTachometerAlt, faUserCircle, faWrench);

export default {
  name: 'Settings'
}
</script>

<style scoped src="@/components/Settings/main.css">
</style>
