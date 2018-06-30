<template>
  <section id="content">
    <div class="heading">Dashboard settings</div>
		<div class="row">
			<div class="title">Dashboard refresh rate</div>
			<div class="button">
				<select class="select" v-model="refreshRate">
					<option value="0">Never</option>
					<option value="3">3 seconds</option>
					<option value="5">5 seconds</option>
					<option value="15">15 seconds</option>
				</select>
			</div>
		</div>
		<div class="row">
			<div class="title">Show temperatures in</div>
			<div class="button" v-on:click="switchTemperatureScale">{{this.temperatureScale | temperatureLabel}}</div>
		</div>
  </section>
</template>

<script>
import { data, created, methods, filters, watch } from '@/components/Settings/Dashboard/dashboard.js';
export default {
  name: 'SettingsDashboard',
  data: data,
  watch: watch,
  created: created,
  methods: methods,
  filters: filters
}
</script>

<style scoped src="@/components/Settings/main.css"></style>
<style scoped src="@/components/Settings/Dashboard/dashboard.css"></style>
