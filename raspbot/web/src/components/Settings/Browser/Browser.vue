<template>
  <section id="content">
    <div class="heading">File browser settings</div>
		<div class="row">
			<div class="title">
				Favorite folder
				<div class="subscript">{{this.favoritFolder}}</div>
			</div>
			<div class="discreet-button noselect" v-on:click="clearBookmark" v-bind:class="{greyed : this.favoritFolder == 'None'}">Clear</div>
		</div>
		<div class="row">
			<div class="title">Show hidden files</div>
			<div class="discreet-button" v-on:click="toggleHiddenFiles">{{this.showHidden | showHiddenLabel}}</div>
		</div>
  </section>
</template>

<script>
import { data, created, methods, filters } from '@/components/Settings/Browser/browser.js';

export default {
  name: 'SettingsBrowser',
  data: data,
  created: created,
  methods: methods,
  filters: filters
}
</script>

<style scoped src="@/shared/general.css"></style>
<style scoped src="@/components/Settings/main.css"></style>
<style scoped src="@/components/Settings/Browser/browser.css"></style>
