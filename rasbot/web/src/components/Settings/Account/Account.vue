<template>
  <section id="content">
    <div class="heading">Account settings</div>
		<div class="row">
			<div class="title">
				Stay logged in
			</div>
			<div class="button noselect" v-on:click="toggleAutoLogin">{{this.autoLogin | autoLoginFilter }}</div>
		</div>

		<div class="row">
			<div class="single-button noselect" v-on:click="signOut">Sign out of Raspy</div>
		</div>
  </section>
</template>

<script>
import { data, created, methods, filters } from '@/components/Settings/Account/account.js';

export default {
  name: 'SettingsAccount',
  data: data,
  created: created,
  methods: methods,
  filters: filters
}

</script>

<style scoped src="@/components/Settings/main.css"></style>
<style scoped src="@/components/Settings/Account/account.css"></style>
