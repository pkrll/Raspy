<template>
  <section id="content">
    <nav class="options">
      <router-link to="/advanced/devices">
        <div class="noselect">
          <font-awesome-icon icon="hdd"/>
          <div class="title">Devices</div>
        </div>
      </router-link>
      <router-link to="/advanced/devices/mounted">
        <div class="noselect">
          <font-awesome-icon :icon="['far', 'hdd']"/>
          <div class="title">Unmount</div>
        </div>
      </router-link>
    </nav>
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
    <router-link to="/settings/control" class="row">
			<div class="icon"><font-awesome-icon icon="keyboard"/></div>
			<div class="title">Control</div>
			<div class="arrow"><font-awesome-icon icon="angle-right"/></div>
		</router-link>

	</section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHdd, faAngleRight, faTachometerAlt, faUserCircle, faKeyboard } from '@fortawesome/free-solid-svg-icons';

library.add(faHdd, faAngleRight, faTachometerAlt, faUserCircle, faKeyboard);

export default {
  name: 'Settings'
}
</script>

<style scoped src="@/components/Settings/main.css">
</style>
