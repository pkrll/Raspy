<template>
	<div>
		<header class="titlebar">
			<font-awesome-icon icon="desktop"/> {{device.name}}
		</header>

		<section class="section">
			<div>
				<div class="header">File system</div>
				<router-link to="/filesystem/browse"><div class="item">Browse files</div></router-link>
			</div>
			<div>
				<div class="header">System information</div>
				<router-link to="/system/temperature"><div class="item">Temperature</div></router-link>
				<router-link to="/system/cpu"><div class="item">CPU usage</div></router-link>
				<router-link to="/system/ram"><div class="item">RAM usage</div></router-link>
				<router-link to="/system/disk"><div class="item">Disk usage</div></router-link>
			</div>
		</section>
	</div>
</template>

<script>
import axios from 'axios';
import {HTTP} from '../http-common';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { desktop } from '@fortawesome/fontawesome-free-solid'

export default {
	name: 'Main',

	components: {
    FontAwesomeIcon
  },

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

<style scoped>
.titlebar {
	background: rgb(229, 73, 95);
	color: 			#fff;
	font-size: 	1.1em;
	padding: 		10px;
}

.section .header {
	background: 		rgb(92, 107, 158);
	color:					rgb(225,225,225);
	font-variant: 	small-caps;
	font-size:  		1.1em;
	text-transform: lowercase;
	padding: 				10px;
}

.section .item {
	background: rgb(114, 186, 208);
	color:			rgb(254,254,252);
	font-size:  1.2em;
	padding: 		10px;
}

.section .item:hover {
	background: rgba(114, 186, 208, 0.5);
}

a {
	text-decoration: none;
}
</style>
