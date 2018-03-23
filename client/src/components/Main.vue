<template>
	<div>
		<h1>
			{{device.name}}
		</h1>
		<ul v-for="parentNode in resources">
			<li v-for="node in parentNode">
				{{node.name}}
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios';
import {HTTP} from '../http-common';

export default {
	name: 'Main',
	data() {
		return {
			resources: {},
			device: {}
		}
	},

	created() {
		HTTP.get('').then(
			response => {
				this.resources = response.data.resources;
				this.device    = response.data.device;
			}
		).catch(e => {
			console.log("ERROR " + e);
		})
	}

}
</script>

<style lang="css">
</style>
